import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Moveable from 'react-moveable';
import { FiX } from 'react-icons/fi';
import { DeleteButton } from '../../styles/home/EditSidebarStyle';
import { DraggableImage } from '../../styles/home/HomeDiaryStyle';
import api from '../../api/api';
import { useItemContext } from '../../context/ItemContext';
import { debounce } from "lodash";

const PageItem = ({
  image,
  pageNum,
  onUpdate,
  onDelete,
  isEditMode,
  onItemSelectChange,
}) => {
  const { selectedItem, setSelectedItem } = useItemContext();
  const imageRef = useRef(null);
  const moveableRef = useRef(null);

  const isSelected = selectedItem === image.id;

  const handleSelect = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isEditMode) {
      setSelectedItem(image.id);
      onItemSelectChange?.(true);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await api.delete(`/api/page/${image.id}`);
      console.log(`Item ${image.id} deleted successfully`);
      onDelete(image.id);

      if (isSelected) {
        setSelectedItem(null);
      }
    } catch (error) {
      console.error('Error deleting item:', error.message);
    }
  };

  // 🔥 회전 API 호출을 디바운스로 최적화 (500ms 동안 추가 입력 없을 때만 실행)
  const debouncedRotateUpdate = debounce(async (imageId, newRotation) => {
    try {
      await api.put(`/api/page?space_id=${activeSpace.id}&pageNum=${pageNum}`, { turnover: newRotation, });
      console.log("✅ 회전 업데이트 성공:", newRotation);
    } catch (error) {
      console.error("❌ 회전 업데이트 실패:", error);
    }
  }, 500);

  // Update position
  const handleDrag = ({ target, delta }) => {
    const currentLeft = parseFloat(target.style.left) || 0;
    const currentTop = parseFloat(target.style.top) || 0;

    const newLeft = currentLeft + delta[0];
    const newTop = currentTop + delta[1];

    target.style.left = `${newLeft}px`;
    target.style.top = `${newTop}px`;

    onUpdate(image.id, {
      positionX: newLeft,
      positionY: newTop,
    });
  };

  // 🔥 회전 시 부모 요소에 transform 적용 → 버튼도 함께 회전됨!
  const handleRotate = ({ target, rotate }) => {
    const parent = target.closest(".page-item"); // 부모 요소 찾기
    if (parent) {
      parent.style.transform = `rotate(${rotate}deg)`;
    }

    // 🔥 API 호출을 디바운스 적용하여 500ms 후에 실행
    debouncedRotateUpdate(image.id, rotate);
  };

  // Update size
  const handleResize = ({ target, width, height }) => {
    target.style.width = `${width}px`;
    target.style.height = `${height}px`;

    onUpdate(image.id, {
      width: width,
      height: height,
    });
  };

  // Click outside -> deselect
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        imageRef.current &&
        !imageRef.current.contains(e.target) &&
        moveableRef.current &&
        !moveableRef.current.contains(e.target)
      ) {
        setSelectedItem(null);
        onItemSelectChange?.(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setSelectedItem, onItemSelectChange]);

  return (
    <div
      className="page-item"
      style={{
        position: 'absolute',
        left: `${image.position?.x}px`,
        top: `${image.position?.y}px`,
        width: image.style?.width || '100px',
        height: image.style?.height || '100px',
        transform: `rotate(${image.rotation || 0}deg)`,
        transformOrigin: 'center center',
        cursor: isEditMode ? 'grab' : 'default',
        zIndex: isSelected ? 9999 : 1,
        pointerEvents: 'auto',
      }}
      onMouseDown={handleSelect}
    >
      <DraggableImage
        ref={imageRef}
        src={image.url}
        alt={image.alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: 'none',
          userSelect: 'none',
        }}
        draggable={false}
      />

      {isSelected && isEditMode && (
        <Moveable
          ref={moveableRef}
          target={imageRef.current}
          container={null}
          origin={false}
          draggable={true}
          resizable={true}
          rotatable={true}
          snappable={false}
          keepRatio={false}
          bounds="parent"
          throttleDrag={0}
          throttleRotate={5} // 🔥 회전 속도를 조절 (5도 단위)
          throttleResize={0}
          renderDirections={["nw", "sw", "se"]} // 필요한 방향의 핸들만 표시
          onDrag={({ target, delta }) => handleDrag({ target, delta })}
          onRotate={({ target, rotate }) => handleRotate({ target, rotate })}
          onResize={({ target, width, height }) => handleResize({ target, width, height })}
        />
      )}

      {isSelected && isEditMode && (
        <DeleteButton
          onClick={handleDelete}
          style={{
            position: 'absolute',
            right: '-12px',
            top: '-12px',
            zIndex: 1001,
            pointerEvents: 'auto',
          }}
        >
          <FiX />
        </DeleteButton>
      )}
    </div>
  );
};

export default PageItem;
import React, { useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Moveable from 'react-moveable';
import { FiX } from 'react-icons/fi';
import { DeleteButton } from '../../styles/home/EditSidebarStyle';
import { DraggableImage } from '../../styles/home/HomeDiaryStyle';
import api from '../../api/api';
import { SpaceContext } from '../../context/SpaceContext';
import { useItemContext } from '../../context/ItemContext';
import { debounce } from "lodash";

const PageItem = ({
  image,
  pageNum,
  onUpdate,
  onDelete,
  isEditMode,
  onItemSelectChange,
  onDeselect,
}) => {
  const { activeSpace } = useContext(SpaceContext);
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

  const handleImageUpdate = async (imageId, updates) => {
    try {
      const response = await api.put(`/api/page?space_id=${activeSpace.id}&pageNum=${pageNum}`, [updates]);
      
      if (response.status === 200) {
        console.log("✅ 이미지 업데이트 성공", response.data);
        onUpdate(imageId, response.data);
      }
    } catch (error) {
      console.error("❌ 이미지 업데이트 실패", error);
    }
  };

  // Click outside -> deselect
  useEffect(() => {
    const handleClickOutside = (e) => {
      console.log("클릭 감지됨");
      if (
        imageRef.current &&
        !imageRef.current.contains(e.target)
      ) {
        console.log("아이템 외부 클릭 감지됨");
        const updates = {
          itemId: image.id,
          title: image.title || "No Title",
          imageUrl: image.imageUrl || "No URL",
          contentsUrl: image.contentsUrl || "No URL",
          ctype: image.ctype,
          positionX: parseFloat(imageRef.current.style.left) || image.position.x,
          positionY: parseFloat(imageRef.current.style.top) || image.position.y,
          height: parseFloat(imageRef.current.style.height) || parseFloat(image.style.height),
          width: parseFloat(imageRef.current.style.width) || parseFloat(image.style.width),
          turnover: parseFloat(imageRef.current.style.transform.replace(/[^0-9\-.,]/g, '')) || image.rotation,
          sequence: 0,
          sticker: image.sticker,
        };
        handleImageUpdate(image.id, updates);
        setSelectedItem(null);
        onItemSelectChange?.(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setSelectedItem, onItemSelectChange, image]);

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
        src={image.ctype === 'sticker' ? image.sticker.src : image.imageUrl}
        alt={image.alt || image.sticker?.alt || 'No Alt'}
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
          throttleRotate={5}
          throttleResize={0}
          renderDirections={["nw", "sw", "se"]}
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
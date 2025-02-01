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
      onDelete(image.id);

      if (isSelected) {
        setSelectedItem(null);
      }
    } catch (error) {
      console.error('Error deleting item:', error.message);
    }
  };

  // 🔥 디바운스된 업데이트 함수 (500ms 동안 추가 입력 없을 때만 실행)
  const debouncedUpdate = debounce(async (imageId, updates) => {
    try {
      await api.put(`/api/page?space_id=${activeSpace.id}&pageNum=${pageNum}`, [updates]);
    } catch (error) {
      console.error("❌ 업데이트 실패:", error);
    }
  }, 500);

  // Update position
const handleDrag = ({ target, delta }) => {
  const parentDiv = target.closest(".page-item");
  const currentLeft = parseFloat(parentDiv.style.left) || 0;
  const currentTop = parseFloat(parentDiv.style.top) || 0;

  // 현재 회전 각도 가져오기
  const rotation = image.turnover || 0;
  const radian = (rotation * Math.PI) / 180;

  // ✅ 회전된 상태에서도 올바르게 드래그 방향을 유지하도록 변환
  const adjustedDeltaX = delta[0] * Math.cos(radian) - delta[1] * Math.sin(radian);
  const adjustedDeltaY = delta[0] * Math.sin(radian) + delta[1] * Math.cos(radian);

  const newLeft = currentLeft + adjustedDeltaX;
  const newTop = currentTop + adjustedDeltaY;

  parentDiv.style.left = `${newLeft}px`;
  parentDiv.style.top = `${newTop}px`;

  onUpdate(image.id, {
    positionX: newLeft,
    positionY: newTop,
  });
};



  // 🔥 회전 시 부모 요소에 transform 적용 → 버튼도 함께 회전됨!
const handleRotate = ({ target, rotate }) => {
  const parentDiv = target.closest(".page-item");
  
  // ✅ 부모 요소의 transform에 직접 회전 적용 (중복 회전 방지)
  parentDiv.style.transform = `rotate(${rotate}deg)`;

  onUpdate(image.id, {
    turnover: rotate
  });
};

  // Update size
  const handleResize = ({ target, width, height }) => {
    target.style.width = `${width}px`;
    target.style.height = `${height}px`;

    const updates = {
      width: width,
      height: height,
    };

    onUpdate(image.id, updates);
    //debouncedUpdate(image.id, updates);
  };

  const handleImageUpdate = async (imageId, updates) => {
    try {
      const response = await api.put(`/api/page?space_id=${activeSpace.id}&pageNum=${pageNum}`, [updates]);

      if (response.status === 200) {
        onUpdate(imageId, response.data);
      }
    } catch (error) {
      console.error("❌ 이미지 업데이트 실패", error);
    }
  };

  // Click outside -> deselect
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        imageRef.current &&
        !imageRef.current.contains(e.target)
      ) {
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
          turnover: parseFloat(imageRef.current.style.transform.replace(/[^0-9\-.,]/g, '')) || image.turnover,
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
        width: image.style?.width,
        height: image.style?.height,
        transform: `rotate(${image.turnover || 0}deg)`,
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
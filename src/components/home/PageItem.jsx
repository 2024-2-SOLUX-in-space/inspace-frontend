import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Moveable from 'react-moveable';
import { FiX } from 'react-icons/fi';
import { debounce } from "lodash";
import { DeleteButton } from '../../styles/home/EditSidebarStyle';
import { DraggableImage } from '../../styles/home/HomeDiaryStyle';
import api from '../../api/api';
import { useItemContext } from '../../context/ItemContext';

const PageItem = ({
  image,
  pageNum,
  onUpdate,
  onDelete,
  isEditMode,
  onItemSelectChange,
}) => {
  const activeSpace = useSelector(state => state.space.activeSpace);
  const { selectedItem, setSelectedItem } = useItemContext();
  const imageRef = useRef(null);
  const moveableRef = useRef(null);
  const prevRotateRef = useRef(0);
  const [localTurnover, setLocalTurnover] = useState(image.turnover || 0);

  const isSelected = selectedItem === image.id;

  // 아이템 외부 클릭하면 선택 해제
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

  useEffect(() => {
    if (imageRef.current) {
      const parentDiv = imageRef.current.closest(".page-item");
      
      // 초기 회전 상태 설정
      parentDiv.style.transform = `rotate(${image.turnover || 0}deg)`;
      parentDiv.style.transformOrigin = "center center";

      // 초기 회전 각도를 로컬 상태에 저장
      setLocalTurnover(image.turnover || 0);
    }
  }, [image.turnover, imageRef]);

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
        onItemSelectChange?.(false);
      }
    } catch (error) {
      console.error('Error deleting item:', error.message);
    }
  };

  // 아이템 이동
  const handleDrag = ({ target, delta }) => {
    const parentDiv = target.closest(".page-item");
    const currentLeft = parseFloat(parentDiv.style.left) || 0;
    const currentTop = parseFloat(parentDiv.style.top) || 0;

    // 현재 회전 각도 가져오기
    const rotation = image.turnover || 0;
    const radian = (rotation * Math.PI) / 180;

    // 회전된 상태에서도 올바르게 드래그 방향을 유지하도록 변환
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

  // 아이템 회전
  const handleRotateStart = () => {
    // 회전을 시작할 때 turnover 값을 prevRotateRef에 저장
    prevRotateRef.current = localTurnover;
  };

  const handleRotate = ({ target, clientX, clientY }) => {
    const parentDiv = target.closest(".page-item");
    const rect = parentDiv.getBoundingClientRect();

    // 이미지 중심 좌표 계산
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // 마우스의 현재 위치에서 중심까지의 각도 계산
     const angle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
      const newTurnover = (prevRotateRef.current + angle) % 360;  // 기존 값에 새로운 각도 추가
    setLocalTurnover(newTurnover);
    // 음수 회전 방지 (예: -10도 → 350도로 변환)
    const normalizedTurnover = newTurnover < 0 ? newTurnover + 360 : newTurnover;

    // 회전값 즉시 적용 (중심 유지)
    parentDiv.style.transform = `rotate(${normalizedTurnover}deg)`;
    parentDiv.style.transformOrigin = "center center";

    // 회전 상태를 로컬에서도 유지
    setLocalTurnover(normalizedTurnover);

    // 데이터 수정
    onUpdate(image.id, {
      turnover: normalizedTurnover
    });
  };

  // 아이템 사이즈 변경
  const handleResize = ({ target, width, height }) => {
    target.style.width = `${width}px`;
    target.style.height = `${height}px`;

    const updates = {
      width: width,
      height: height,
    };

    onUpdate(image.id, updates);
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
          throttleRotate={0}
          throttleResize={0}
          renderDirections={["nw", "sw", "se"]}
          onDrag={({ target, delta }) => handleDrag({ target, delta })}
          onRotateStart={handleRotateStart}
          onRotate={({ target, clientX, clientY }) => handleRotate({ target, clientX, clientY })}
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
import React, { useState, useEffect } from 'react';
import Moveable from "react-moveable";
import { FiX } from "react-icons/fi";
import { DeleteButton } from '../../styles/home/EditSidebarStyle';
import { DraggableImage } from '../../styles/home/HomeDiaryStyle';

const PageItem = ({ image, onUpdate, onDelete, isEditMode, pagePair, onSelectChange }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const calculateMouseOffset = (event, target) => {
    const rect = target.getBoundingClientRect();
    const rotation = image.rotation || 0;
    const radian = (rotation * Math.PI) / 180;
    
    // 마우스 위치와 타겟의 상대 위치 계산
    const relativeX = event.clientX - rect.left;
    const relativeY = event.clientY - rect.top;
    
    // 회전을 고려한 오프셋 계산
    const offsetX = relativeX * Math.cos(radian) + relativeY * Math.sin(radian);
    const offsetY = -relativeX * Math.sin(radian) + relativeY * Math.cos(radian);
    
    return { x: offsetX, y: offsetY };
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(image.id);
  };

  const handleSelect = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSelected(true);
    onSelectChange(true);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.page-item')) {
        setIsSelected(false);
        onSelectChange(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onSelectChange]);

  const handleImageUpdate = (updates) => {
    if (updates.pageNumber && 
        (updates.pageNumber < pagePair[0] || 
         updates.pageNumber > pagePair[1])) {
      return;
    }
    onUpdate(image.id, updates);
  };

  const handleDrag = ({ target, delta, inputEvent }) => {
    inputEvent.stopPropagation();
    inputEvent.preventDefault();
    
    const parentDiv = target.closest('.page-item');
    const currentLeft = parseFloat(parentDiv.style.left) || 0;
    const currentTop = parseFloat(parentDiv.style.top) || 0;
    
    const rotation = image.rotation || 0;
    const radian = (rotation * Math.PI) / 180;
    
    // 회전을 고려한 delta 값 계산
    const adjustedDeltaX = delta[0] * Math.cos(radian) - delta[1] * Math.sin(radian);
    const adjustedDeltaY = delta[0] * Math.sin(radian) + delta[1] * Math.cos(radian);
    
    const newLeft = currentLeft + adjustedDeltaX;
    const newTop = currentTop + adjustedDeltaY;

    parentDiv.style.left = `${newLeft}px`;
    parentDiv.style.top = `${newTop}px`;
    
    handleImageUpdate({
      position: { x: newLeft, y: newTop }
    });
  };

  const handleRotate = ({ target, transform, rotate, inputEvent }) => {
    const parentDiv = target.closest('.page-item');
    const currentRotation = image.rotation || 0;
    const newRotation = currentRotation + (rotate * 0.03);
    parentDiv.style.transform = `rotate(${newRotation}deg)`;
    target.style.transform = 'none';
    const offset = calculateMouseOffset(inputEvent, target);
    setDragOffset(offset);
    handleImageUpdate({
      rotation: newRotation
    });
  };

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
        cursor: isDragging ? 'grabbing' : 'auto',
        zIndex: isSelected ? 9999 : 1,
        pointerEvents: 'auto'
      }}
      onMouseDown={handleSelect}
    >
      <DraggableImage 
        className={`moveable-image image-${image.id}`}
        src={image.url} 
        alt={image.alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: 'none',
          cursor: isSelected ? (isDragging ? 'grabbing' : 'grab') : 'default',
          userSelect: 'none'
        }}
      />
      
      {isSelected && (
        <Moveable
          target={document.querySelector(`.image-${image.id}`)}
          container={null}
          origin={false}
          draggable={true}
          resizable={true}
          rotatable={true}
          snappable={true}
          keepRatio={false}
          bounds="parent"
          renderDirections={["nw","se"]}
          rotationPosition="top"
          throttleRotate={0}
          rotateAroundCenter={true}
          initialRotation={image.rotation || 0}
          onDragStart={({ inputEvent, target }) => {
            setIsDragging(true);
            const offset = calculateMouseOffset(inputEvent, target);
            setDragOffset(offset);
            inputEvent.stopPropagation();
            inputEvent.preventDefault();
          }}
          onDragEnd={({ inputEvent, target }) => {
            setIsDragging(false);
            const offset = calculateMouseOffset(inputEvent, target);
            setDragOffset(offset);
            inputEvent.stopPropagation();
            inputEvent.preventDefault();
          }}
          onDrag={handleDrag}
          onRotate={handleRotate}
          onResize={({ target, width, height }) => {
            const parentDiv = target.closest('.page-item');
            parentDiv.style.width = `${width}px`;
            parentDiv.style.height = `${height}px`;
            target.style.width = '100%';
            target.style.height = '100%';
            handleImageUpdate({
              style: {
                width: `${width}px`,
                height: `${height}px`
              }
            });
          }}
        />
      )}

      {(isSelected || !image.isSticker) && (
        <DeleteButton 
          className={`delete-button-${image.id}`}
          onClick={handleDelete}
          style={{
            position: 'absolute',
            right: '-12px',
            top: '-12px',
            zIndex: 1001,
            transform: 'none',
            pointerEvents: 'auto'
          }}
        >
          <FiX />
        </DeleteButton>
      )}
    </div>
  );
};

export default PageItem; 
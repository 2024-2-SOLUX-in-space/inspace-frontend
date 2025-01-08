import React, { useState, useEffect } from 'react';
import Moveable from "react-moveable";
import { FiX } from "react-icons/fi";
import { DeleteButton } from '../styles/EditSidebarStyle';
import { DraggableImage } from '../styles/HomeDiaryStyle';

const PageItem = ({ image, onUpdate, onDelete, isEditMode, pagePair, onSelectChange }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

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
          renderDirections={["se"]}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          onDrag={({ target, transform, beforeTransform, left, top, delta }) => {
            const parentDiv = target.closest('.page-item');
            const currentLeft = parseFloat(parentDiv.style.left) || 0;
            const currentTop = parseFloat(parentDiv.style.top) || 0;
            
            const newLeft = currentLeft + delta[0];
            const newTop = currentTop + delta[1];

            parentDiv.style.left = `${newLeft}px`;
            parentDiv.style.top = `${newTop}px`;
            
            handleImageUpdate({
              position: { x: newLeft, y: newTop }
            });
          }}
          onRotate={({ target, transform, rotate }) => {
            const parentDiv = target.closest('.page-item');
            parentDiv.style.transform = `rotate(${rotate}deg)`;
            target.style.transform = 'none';
            handleImageUpdate({
              rotation: rotate
            });
          }}
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
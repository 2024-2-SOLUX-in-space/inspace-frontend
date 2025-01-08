import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { FiX } from "react-icons/fi";
import { DeleteButton } from '../styles/EditSidebarStyle';
import { DraggableImage } from '../styles/HomeDiaryStyle';

const PageItem = ({ image, onUpdate, onDelete }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(image.id);
  };

  const handleSelect = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSelected(true);
  };

  const handleDragStop = (e, d) => {
    e.stopPropagation();
    onUpdate(image.id, {
      position: { x: d.x, y: d.y }
    });
  };

  const handleResizeStop = (e, direction, ref, delta, position) => {
    e.stopPropagation();
    onUpdate(image.id, {
      position: position,
      style: {
        width: ref.style.width,
        height: ref.style.height
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.page-item')) {
        setIsSelected(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div 
      className="page-item"
      style={{ position: 'relative' }}
      onMouseDown={handleSelect}
    >
      <Rnd
        default={{
          x: image.position?.x || 0,
          y: image.position?.y || 0,
          width: parseInt(image.style?.width) || 100,
          height: parseInt(image.style?.height) || 100
        }}
        minWidth={50}
        minHeight={50}
        bounds="parent"
        onDragStop={handleDragStop}
        onResizeStop={handleResizeStop}
        className="react-rnd"
        style={{
          border: isSelected ? '2px solid #007bff' : '1px dashed #666',
          borderRadius: '4px',
          padding: '4px'
        }}
      >
        <DraggableImage 
          src={image.url} 
          alt={image.alt}
          style={{
            width: '100%',
            height: '100%',
            transform: `rotate(${image.rotation || 0}deg)`
          }}
        />
        {(isSelected || !image.isSticker) && (
          <div 
            className="delete-button-container"
            onClick={handleDelete}
            style={{ 
              position: 'absolute',
              right: '-12px',
              top: '-12px',
              zIndex: 1001,
              cursor: 'pointer',
              pointerEvents: 'all'
            }}
          >
            <DeleteButton className="delete-button">
              <FiX />
            </DeleteButton>
          </div>
        )}
      </Rnd>
    </div>
  );
};

export default PageItem; 
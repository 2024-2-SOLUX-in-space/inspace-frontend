// src/components/home/PageItem.jsx
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Moveable from 'react-moveable';
import { FiX } from 'react-icons/fi';
import { DeleteButton } from '../../styles/home/EditSidebarStyle';
import { DraggableImage } from '../../styles/home/HomeDiaryStyle';
import api from '../../api/api';
import { useItemContext } from '../../context/ItemContext';

const PageItem = ({
  image,
  onUpdate,
  onDelete,
  isEditMode,
  selectedImageId,
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
      // 필요 시 API delete 호출
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

  // Update rotation
  const handleRotate = ({ target, rotate }) => {
    const newRotation = (image.rotation || 0) + rotate;
    target.style.transform = `rotate(${newRotation}deg)`;

    onUpdate(image.id, { turnover: newRotation });
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
          throttleRotate={0}
          throttleResize={0}
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

PageItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    alt: PropTypes.string,
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    rotation: PropTypes.number,
    style: PropTypes.shape({
      width: PropTypes.string,
      height: PropTypes.string,
    }),
    isSticker: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  selectedImageId: PropTypes.string,
  onImageSelect: PropTypes.func,
  onItemSelectChange: PropTypes.func,
};

export default PageItem;
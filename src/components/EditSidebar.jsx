import React, { useState } from 'react';
import { FiFolderPlus, FiImage, FiYoutube, FiMusic } from "react-icons/fi";
import { BiSticker } from "react-icons/bi";
import {
  SidebarContainer,
  SidebarContent,
  DraggableContainer,
  DraggableItem,
  StyledImage,
  IconContainer
} from '../styles/EditSidebarStyle';

const EditSidebar = ({ isOpen, onClose, images }) => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  
  const icons = [
    { id: 'file', Icon: FiFolderPlus, alt: '파일' },
    { id: 'image', Icon: FiImage, alt: '이미지' },
    { id: 'youtube', Icon: FiYoutube, alt: '유튜브' },
    { id: 'music', Icon: FiMusic, alt: '음악' },
    { id: 'sticker', Icon: BiSticker, alt: '스티커' }
  ];

  const handleDragStart = (image) => (e) => {
    window.draggedImage = image;
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarContent>
        <DraggableContainer>
          {images.map((image) => (
            <DraggableItem key={image.id}>
              <StyledImage 
                src={image.src} 
                alt={image.alt} 
                draggable="true"
                onDragStart={handleDragStart(image)}
              />
            </DraggableItem>
          ))}
        </DraggableContainer>
        
        <IconContainer>
          {icons.map((icon) => (
            <div key={icon.id}>
              <icon.Icon 
                onClick={() => setSelectedIcon(icon.id)}
                style={{ 
                  color: selectedIcon === icon.id ? '#000000' : undefined 
                }}
              />
            </div>
          ))}
        </IconContainer>
      </SidebarContent>
    </SidebarContainer>
  );
};

export default EditSidebar;

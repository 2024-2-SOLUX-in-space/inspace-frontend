import React from 'react';
import {
  SidebarContainer,
  SidebarContent,
  DraggableContainer,
  DraggableItem,
  StyledImage,
  EditIcons,
  IconButton
} from '../styles/EditSidebarStyle';

const EditSidebar = ({ isOpen, onClose, images }) => {
  const icons = [
    { id: 'file', src: '/icon_file.png', alt: '파일' },
    { id: 'youtube', src: '/icon_youtube.png', alt: '유튜브' },
    { id: 'music', src: '/icon_music.png', alt: '음악' },
    { id: 'sticker', src: '/icon_sticker.png', alt: '스티커' }
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

        <EditIcons>
          {icons.map((icon) => (
            <IconButton key={icon.id}>
              <img src={icon.src} alt={icon.alt} />
            </IconButton>
          ))}
        </EditIcons>
      </SidebarContent>
    </SidebarContainer>
  );
};

export default EditSidebar;

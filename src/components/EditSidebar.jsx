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
import stickerData from '../data/stickers.json';

const initialCategoryData = {
  image: [
    { id: 'bear1', src: '/bear1.png', alt: '곰1' },
    { id: 'bear2', src: '/bear2.png', alt: '곰2' },
    { id: 'bear3', src: '/bear3.png', alt: '곰3' }
  ],
  youtube: [
    { id: 'youtube1', src: '/youtube1.png', alt: '유튜브1' },
    { id: 'youtube2', src: '/youtube2.png', alt: '유튜브2' },
    { id: 'youtube3', src: '/youtube3.png', alt: '유튜브3' }
  ],
  music: [
    { id: 'music1', src: '/music1.png', alt: '음악1' },
    { id: 'music2', src: '/music2.png', alt: '음악2' },
    { id: 'music3', src: '/music3.png', alt: '음악3' }
  ],
  sticker: stickerData.stickers,
  file: []
};

const EditSidebar = ({ isOpen, onClose }) => {
  const [selectedIcon, setSelectedIcon] = useState('image');
  const [categoryData, setCategoryData] = useState(initialCategoryData);

  const icons = [
    { id: 'image', Icon: FiImage, alt: '이미지' },
    { id: 'youtube', Icon: FiYoutube, alt: '유튜브' },
    { id: 'music', Icon: FiMusic, alt: '음악' },
    { id: 'sticker', Icon: BiSticker, alt: '스티커' },
        { id: 'file', Icon: FiFolderPlus, alt: '파일' },
  ];

  const handleDragStart = (image) => (e) => {
    window.draggedImage = image;
  };

  const getCurrentData = () => {
    return categoryData[selectedIcon] || [];
  };

  // 현재 선택된 카테고리가 스티커인지 확인하는 함수
  const isStickersSelected = () => selectedIcon === 'sticker';

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarContent>
        <DraggableContainer isStickers={isStickersSelected()}>
          {getCurrentData().map((item) => (
            <DraggableItem key={item.id}>
              <StyledImage 
                src={item.src} 
                alt={item.alt} 
                draggable="true"
                onDragStart={handleDragStart(item)}
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

import React, { useState, useRef } from 'react';
import { FiFolderPlus, FiImage, FiYoutube, FiMusic, FiPlus, FiX } from "react-icons/fi";
import { BiSticker } from "react-icons/bi";
import {
  SidebarContainer,
  SidebarContent,
  DraggableContainer,
  DraggableItem,
  StyledImage,
  IconContainer,
  AddButtonContainer,
  AddButton,
  DeleteButton
} from '../../styles/home/EditSidebarStyle';
import stickerData from '../../data/stickers.json';
import ImageAddModal from '../../pages/home/ImageAddModal';

const initialCategoryData = {
  image: [
    { id: 'bear1', src: '/public/home/bear1.png', alt: '곰1' },
    { id: 'bear2', src: '/public/home/bear2.png', alt: '곰2' },
    { id: 'bear3', src: '/public/home/bear3.png', alt: '곰3' }
  ],
  youtube: [
    { id: 'youtube1', src: '/public/home/youtube1.png', alt: '유튜브1' },
    { id: 'youtube2', src: '/public/home/youtube2.png', alt: '유튜브2' },
      { id: 'youtube3', src: '/public/home/youtube3.png', alt: '유튜브3' }
  ],
  music: [
    { id: 'music1', src: '/public/home/music1.png', alt: '음악1' },
    { id: 'music2', src: '/public/home/music2.png', alt: '음악2' },
    { id: 'music3', src: '/public/home/music3.png', alt: '음악3' }
  ],
  sticker: stickerData.stickers,
  file: []
};

const EditSidebar = ({ isOpen, onClose }) => {
  const [selectedIcon, setSelectedIcon] = useState('image');
  const [categoryData, setCategoryData] = useState(initialCategoryData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const icons = [
    { id: 'image', Icon: FiImage, alt: '이미지' },
    { id: 'youtube', Icon: FiYoutube, alt: '유튜브' },
    { id: 'music', Icon: FiMusic, alt: '음악' },
    { id: 'sticker', Icon: BiSticker, alt: '스티커' },
    { id: 'file', Icon: FiFolderPlus, alt: '파일' },
  ];

  const handleDragStart = (image) => (e) => {
    const rect = e.target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    window.draggedImage = {
      ...image,
      width: e.target.width,
      height: e.target.height,
      offsetX: offsetX,
      offsetY: offsetY,
      isSticker: isStickersSelected(),
      style: {
        width: `${e.target.width}px`,
        height: `${e.target.height}px`
      }
    };
  };

  const getCurrentData = () => {
    return categoryData[selectedIcon] || [];
  };

  const isStickersSelected = () => selectedIcon === 'sticker';

  const handleFileButtonClick = () => {
    setSelectedIcon('file');
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      setSelectedFile(files[0]);
      setIsModalOpen(true);
    }
  };

  const handleSaveImage = (title, croppedImageUrl, dimensions) => {
    if (selectedFile) {
      const img = new Image();
      img.onload = () => {
        const newImage = {
          id: `file-${Date.now()}`,
          src: croppedImageUrl,
          alt: title || selectedFile.name,
          width: dimensions?.width || img.width,
          height: dimensions?.height || img.height,
          style: {
            width: dimensions?.width ? `${dimensions.width}px` : 'auto',
            height: dimensions?.height ? `${dimensions.height}px` : 'auto'
          }
        };

        setCategoryData(prev => ({
          ...prev,
          file: [...prev.file, newImage]
        }));
        
        setSelectedFile(null);
      };
      img.src = croppedImageUrl;
    }
  };

  const handleDeleteItem = (itemId) => {
    setCategoryData(prev => ({
      ...prev,
      [selectedIcon]: prev[selectedIcon].filter(item => item.id !== itemId)
    }));
  };

  return (
    <>
      <SidebarContainer isOpen={isOpen}>
        <SidebarContent>
          <DraggableContainer isStickers={isStickersSelected()}>
            {getCurrentData().map((item) => (
              <DraggableItem key={item.id}>
                <div style={{ position: 'relative' }}>
                  <StyledImage 
                    src={item.src} 
                    alt={item.alt} 
                    draggable="true"
                    onDragStart={handleDragStart({
                      ...item,
                      isSticker: isStickersSelected()
                    })}
                    isSticker={isStickersSelected()}
                    width={item.width}
                    height={item.height}
                    style={item.style}
                  />
                  {!isStickersSelected() && (
                    <DeleteButton onClick={() => handleDeleteItem(item.id)}>
                      <FiX />
                    </DeleteButton>
                  )}
                </div>
              </DraggableItem>
            ))}
          </DraggableContainer>

          {selectedIcon === 'file' && (
            <AddButtonContainer>
              <AddButton onClick={() => fileInputRef.current?.click()}>
                <FiPlus />
                추가
              </AddButton>
            </AddButtonContainer>
          )}
          
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
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileUpload}
              accept="image/*"
            />
          </IconContainer>
        </SidebarContent>
      </SidebarContainer>

      <ImageAddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageFile={selectedFile}
        onSave={handleSaveImage}
      />
    </>
  );
};

export default EditSidebar;

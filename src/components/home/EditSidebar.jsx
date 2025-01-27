import React, { useState, useEffect, useRef, useContext } from 'react';
import { FiFolderPlus, FiImage, FiYoutube, FiMusic, FiPlus, FiX } from "react-icons/fi";
import { BiSticker } from "react-icons/bi";
import { SpaceContext } from '../../context/SpaceContext';
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
import api from '../../api/api';

const EditSidebar = ({ isOpen, onClose }) => {
  const { selectedSpace } = useContext(SpaceContext);
  const [selectedIcon, setSelectedIcon] = useState('image');
  const [categoryData, setCategoryData] = useState({
    image: [],
    youtube: [],
    music: [],
    sticker: [stickerData.stickers],
    file: []
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const category = selectedIcon === 'file' ? 'USERIMAGE' : selectedIcon.toUpperCase();
        const response = await api.get(`/api/category/space/${selectedSpace.spaceId}?category=${category}`);
        setCategoryData(prev => ({
          ...prev,
          [selectedIcon]: response.data
        }));
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchCategoryData();
  }, [selectedIcon, selectedSpace]);

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
    const data = categoryData[selectedIcon];
    return Array.isArray(data) ? data : [];
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
      img.onload = async () => {
        try {
          const formData = new FormData();
          formData.append('file', selectedFile, 'cropped-image.png');

          const response = await api.post(`/api/image?spaceId=${selectedSpace.spaceId}&title=${title}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          const newImageId = response.data.id;

          // 추가된 이미지의 ID로 API 호출
          const newImageResponse = await api.get(`/api/image/${newImageId}`);
          const newImage = newImageResponse.data;

          setCategoryData(prev => ({
            ...prev,
            [selectedIcon]: [...prev[selectedIcon], newImage]
          }));

          setRenderKey(prevKey => prevKey + 1);

          setSelectedFile(null);
          setIsModalOpen(false);
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      };
      img.src = croppedImageUrl;
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      // API 호출
      await api.delete(`/api/delete/item?itemId=${itemId}`);
      console.log(`Item ${itemId} deleted successfully`);

      // 로컬 상태에서 항목 삭제
      setCategoryData(prev => ({
        ...prev,
        [selectedIcon]: prev[selectedIcon].filter(item => item.id !== itemId)
      }));
    } catch (error) {
      console.error('Error deleting item:', error.message);
      console.error('Error details:', error.response?.data || error);
    }
  };

  return (
    <div key={renderKey}>
      <SidebarContainer isOpen={isOpen}>
        <SidebarContent>
          <DraggableContainer isStickers={isStickersSelected()}>
            {getCurrentData().map((item, index) => (
              <DraggableItem key={index}>
                <div style={{ position: 'relative' }}>
                  <StyledImage 
                    src={item.imageUrl}
                    alt={item.title}
                    draggable="true"
                    onDragStart={handleDragStart({
                      ...item,
                      isSticker: isStickersSelected()
                    })}
                    isSticker={isStickersSelected()}
                    width={item.width || 'auto'}
                    height={item.height || 'auto'}
                    style={item.style}
                  />
                  {['image', 'youtube', 'music', 'file'].includes(selectedIcon) && (
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
                    color: selectedIcon === icon.id ? '#000000' : 'rgb(182, 182, 182)'
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
    </div>
  );
};

export default EditSidebar;

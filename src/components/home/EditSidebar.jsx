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
import api from '../../api/api';
import { useItemContext } from '../../context/ItemContext';
import ImageAddModal from '../../pages/home/ImageAddModal';

const EditSidebar = ({
  isOpen,
  onFileSelected,
  selectedIcon,
  setSelectedIcon
}) => {
  const { activeSpace } = useContext(SpaceContext);
  const { setSelectedItem } = useItemContext();

  const [categoryData, setCategoryData] = useState({
    image: [],
    youtube: [],
    music: [],
    sticker: stickerData.stickers, 
    file: []
  });

  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (!activeSpace || !activeSpace.id || selectedIcon === 'sticker') {
      resetCategoryData();
      return;
    }
    fetchCategoryData();
  }, [selectedIcon, activeSpace]);

  const fetchCategoryData = async () => {
    setIsLoading(true);
    try {
      const category = (selectedIcon === 'file')
        ? 'USERIMAGE'
        : selectedIcon.toUpperCase();

      const response = await api.get(
        `/api/category/space/${activeSpace.id}?category=${category}`
      );

      const dataWithId = (response.data || []).map(item => ({
        ...item,
        id: item.itemId || `temp-id-${Date.now()}`
      }));

      setCategoryData(prev => ({
        ...prev,
        [selectedIcon]: dataWithId
      }));
    } catch (error) {
      console.error('Error fetching category data:', error);
      setCategoryData(prev => ({
        ...prev,
        [selectedIcon]: []
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const resetCategoryData = () => {
    setCategoryData({
      image: [],
      youtube: [],
      music: [],
      sticker: stickerData.stickers,
      file: []
    });
  };

  const handleOpenModal = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      setSelectedFile(files[0]);
      setIsModalOpen(true);
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!activeSpace || !activeSpace.id) {
      alert('삭제할 수 없습니다. 활성화된 공간이 선택되지 않았습니다.');
      return;
    }
    if (!itemId || itemId.startsWith('temp-id-')) {
      alert('삭제할 수 없습니다. 유효하지 않은 항목입니다.');
      return;
    }

    setIsLoading(true);
    try {
      await api.delete(`/api/delete/item?itemId=${itemId}`);
      setCategoryData(prev => ({
        ...prev,
        [selectedIcon]: prev[selectedIcon].filter(item => item.id !== itemId)
      }));
      setSelectedItem(prevSelected => (prevSelected === itemId ? null : prevSelected));
    } catch (error) {
      console.error('Error deleting item:', error.message);
      alert('항목 삭제에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragStart = (item) => (e) => {
    const img = new Image();
    img.src = item.src || item.imageUrl;

    img.onload = () => {
      const rect = e.target.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      window.draggedImage = {
        id: item.id,
        title: item.title || item.alt || "No Title",
        imageUrl: item.src || item.imageUrl || "No URL",
        contentsUrl: item.src || item.contentsUrl || "No URL",
        ctype: selectedIcon === 'file' ? 'image' : selectedIcon,
        positionX: offsetX,
        positionY: offsetY,
        width: e.target.offsetWidth,
        height: e.target.offsetHeight,
        turnover: item.turnover || 0,
        sequence: 1,
        sticker: selectedIcon === 'sticker' ? {
          title: item.id,
          src: item.src,
          alt: item.alt,
          color: item.color
        } : null,
      };
      console.log(window.draggedImage);
    };
  };

  const handleCloseModal = () => setIsModalOpen(false);
  
  const handleAddItem = (createdItem) => {
    const newItem = {
      ...createdItem,
      
      id: createdItem['item-id'], // response body에 있는 item-id를 id로 사용
      imageUrl: createdItem.fileUrl // response body에 있는 fileUrl을 imageUrl로 사용
      
    };
    console.log(newItem);
    setCategoryData(prev => ({
      ...prev,
      file: [...prev.file, newItem]
    }));
    handleCloseModal();
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarContent>
        {isLoading ? (
          null
        ) : (
          <DraggableContainer isStickers={selectedIcon === 'sticker'}>
            {selectedIcon === 'sticker' ? (
              stickerData.stickers.map(sticker => (
                <DraggableItem key={sticker.id}>
                  <StyledImage
                    src={sticker.src}
                    alt={sticker.alt}
                    draggable="true"
                    onDragStart={handleDragStart(sticker)}
                  />
                </DraggableItem>
              ))
            ) : (
              categoryData[selectedIcon].map(item => (
                <DraggableItem key={item.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ position: 'relative' }}>
                    <StyledImage
                      src={item.imageUrl}
                      alt={item.title}
                      draggable="true"
                      onDragStart={handleDragStart(item)}
                      style={{ width: '90%', height: '90%' }}
                    />
                    <DeleteButton
                      onClick={() => handleDeleteItem(item.id)}
                      style={{
                        position: 'absolute',
                        top: '-10px',
                        right: '-10px',
                        zIndex: 1001,
                        pointerEvents: 'auto',
                      }}
                    >
                      <FiX />
                    </DeleteButton>
                  </div>
                </DraggableItem>
              ))
            )}
          </DraggableContainer>
        )}

        {selectedIcon === 'file' && (
          <AddButtonContainer>
            <AddButton onClick={handleOpenModal}>
              <FiPlus /> 추가
            </AddButton>
          </AddButtonContainer>
        )}

        <IconContainer>
          {[
            { id: 'image', Icon: FiImage },
            { id: 'youtube', Icon: FiYoutube },
            { id: 'music', Icon: FiMusic },
            { id: 'sticker', Icon: BiSticker },
            { id: 'file', Icon: FiFolderPlus }
          ].map(icon => (
            <div key={icon.id}>
              <icon.Icon
                onClick={() => setSelectedIcon(icon.id)}
                style={{
                  color: selectedIcon === icon.id ? '#000000' : 'rgb(182, 182, 182)',
                  cursor: 'pointer',
                  fontSize: '24px',
                  margin: '0 8px'
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

        <ImageAddModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          imageFile={selectedFile}
          onSave={handleAddItem}
        />
      </SidebarContent>
    </SidebarContainer>
  );
};

export default EditSidebar;

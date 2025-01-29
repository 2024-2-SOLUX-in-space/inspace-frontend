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
import { useItemContext } from '../../context/ItemContext';

const EditSidebar = ({ isOpen, onClose, images }) => {
  const { activeSpace } = useContext(SpaceContext);
  const [selectedIcon, setSelectedIcon] = useState('image');
  const [categoryData, setCategoryData] = useState({
    image: [],
    youtube: [],
    music: [],
    sticker: [...stickerData.stickers],
    file: []
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const { setSelectedItem } = useItemContext();

  useEffect(() => {
    const fetchCategoryData = async () => {
      if (!activeSpace || !activeSpace.id) {
        console.warn('No activeSpace selected.');
        setCategoryData({
          image: [],
          youtube: [],
          music: [],
          sticker: [...stickerData.stickers],
          file: []
        });
        setIsDataLoaded(false);
        return;
      }

      try {
        const category = selectedIcon === 'file' ? 'USERIMAGE' : selectedIcon.toUpperCase();
        const response = await api.get(`/api/category/space/${activeSpace.id}?category=${category}`);

        const dataWithId = response.data.map(item => {
          if (!item.itemId) {
            console.warn('Item without id found:', item);
            return { ...item, itemId: `temp-id-${Date.now()}` };
          }
          return { ...item, id: item.itemId };
        });

        setCategoryData(prev => ({
          ...prev,
          [selectedIcon]: dataWithId
        }));
        setIsDataLoaded(true);
      } catch (error) {
        console.error('Error fetching category data:', error);
        setIsDataLoaded(false);
      }
    };

    fetchCategoryData();
  }, [selectedIcon, activeSpace]);

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

  const handleDeleteItem = async (itemId) => {
    if (!activeSpace || !activeSpace.id) {
      console.error('Cannot delete item: No activeSpace selected.');
      alert('삭제할 수 없습니다. 활성화된 공간이 선택되지 않았습니다.');
      return;
    }

    if (!itemId || itemId.startsWith('temp-id-')) {
      console.error('Invalid item ID:', itemId);
      alert('삭제할 수 없습니다. 유효하지 않은 항목입니다.');
      return;
    }

    try {
      const apiUrl = `/api/delete/item?itemId=${itemId}`;

      await api.delete(apiUrl);
      console.log(`Item ${itemId} deleted successfully from space ${activeSpace.id}`);

      setCategoryData(prev => ({
        ...prev,
        [selectedIcon]: prev[selectedIcon].filter(item => item.id !== itemId)
      }));

      // 삭제된 아이템이 선택된 경우 선택 해제
      setSelectedItem(prevSelected => prevSelected === itemId ? null : prevSelected);
    } catch (error) {
      console.error('Error deleting item:', error.message);
      console.error('Error details:', error.response?.data || error);
      alert('항목 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleAddItem = async (newItem) => {
    const { id, title } = newItem;

    try {
      const response = await api.post(`/api/image?spaceId=${activeSpace.id}&title=${title}`, {
        id,
        title
      });

      console.log('Item added successfully:', response.data);

      setCategoryData(prev => ({
        ...prev,
        [selectedIcon]: [...prev[selectedIcon], response.data]
      }));
      
    } catch (error) {
      console.error('Error adding item:', error.message);
      console.error('Error details:', error.response?.data || error);
      alert('항목 추가에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div>
      <SidebarContainer isOpen={isOpen}>
        <SidebarContent>
          {isDataLoaded && (
            <DraggableContainer isStickers={isStickersSelected()}>
              {getCurrentData().map((item) => (
                <DraggableItem key={item.id}>
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
                    <DeleteButton onClick={() => handleDeleteItem(item.id)}>
                      <FiX />
                    </DeleteButton>
                  </div>
                </DraggableItem>
              ))}
            </DraggableContainer>
          )}

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
        </SidebarContent>
      </SidebarContainer>

      <ImageAddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageFile={selectedFile}
        onSave={handleAddItem}
      />
    </div>
  );
};

export default EditSidebar;

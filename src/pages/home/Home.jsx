import React, { useState, useEffect, Suspense } from 'react';
import { useSelector } from 'react-redux';
import HomeDiary from '../../components/home/HomeDiary';
import EditSidebar from '../../components/home/EditSidebar';
import Header from '../../components/Header';
import emptySpace from '../../../public/home/diary.png';
import { HomeContainer, ContentWrapper, EditButton } from '../../styles/home/HomeStyle';
import { useItemContext } from '../../context/ItemContext';

const Home = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [draggableImages, setDraggableImages] = useState([]);
  const [diaryData, setDiaryData] = useState({});
  const [selectedIcon, setSelectedIcon] = useState('image');
  
  const [newItem, setNewItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const activeSpace = useSelector(state => state.space.activeSpace);
  const selectedSpace = useSelector(state => state.space.selectedSpace);
  const { selectedItem, setSelectedItem } = useItemContext();
  const spaces = useSelector(state => state.space.spaces);

  const hasSpaces = spaces.length > 0;

  useEffect(() => {
    if (activeSpace !== null) {
      setIsLoading(false);
    }
  }, [activeSpace]);

  const handleEdit = () => {
    setIsEditOpen(!isEditOpen);
  };
  const handleCloseSidebar = () => {
    setIsEditOpen(false);
  };

  const handleImageDrop = async (pageNum, x, y) => {
    const draggedImage = window.draggedImage;
    if (!draggedImage) return;

    const newItem = {
      itemId: draggedImage.id,
      title: draggedImage.title || "No Title",
      imageUrl: draggedImage.src || "No URL",
      contentsUrl: draggedImage.src || "No URL",
      ctype: draggedImage.ctype,
      positionX: x,
      positionY: y,
      height: draggedImage.height || 100,
      width: draggedImage.width || 100,
      turnover: 0,
      sequence: 0,
      sticker: draggedImage.ctype === "sticker" ? {
        title: draggedImage.id,
        src: draggedImage.src, 
        alt: draggedImage.alt,
        color: draggedImage.color
      } : null
    };

    setDiaryData(prev => ({
      ...prev,
      [pageNum]: [...(prev[pageNum] || []), newItem],
    }));

    setDraggableImages(prev =>
      prev.filter(img => img.id !== draggedImage.id)
    );

    window.draggedImage = null;
  };

  const handleImageResize = (imageId, newSize) => {
    setDiaryData(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(pageNum => {
        updated[pageNum] = updated[pageNum].map(img =>
          img.id === imageId
            ? {
                ...img,
                style: {
                  ...img.style,
                  width: `${newSize.width}px`,
                  height: `${newSize.height}px`,
                },
              }
            : img
        );
      });
      return updated;
    });
  };

  const handleImageSelect = (imageId) => {
    setSelectedItem(imageId);
  };

  const handleImageRotate = (imageId, angle) => {
    setDiaryData(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(pageNum => {
        updated[pageNum] = updated[pageNum].map(img =>
          img.id === imageId
            ? { ...img, rotation: angle }
            : img
        );
      });
      return updated;
    });
  };

  const handleImageMove = (imageId, newPageNumber, newPosition) => {
    setDiaryData(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(pageNum => {
        updated[pageNum] = updated[pageNum].map(img =>
          img.id === imageId
            ? {
                ...img,
                pageNumber: newPageNumber,
                position: newPosition,
              }
            : img
        );
      });
      return updated;
    });
  };

  const renderContent = () => {
    if (!hasSpaces) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <img src={emptySpace} alt="empty-space" style={{ width: '60%', height: '60%' }} />
        </div>
      );
    }

    return (
      <>
        <Suspense fallback={<div>Loading...</div>}>
          <HomeDiary
            diaryData={diaryData}
            onImageDrop={handleImageDrop}
            onImageResize={handleImageResize}
            onImageMove={handleImageMove}
            isEditMode={isEditOpen}
            selectedImageId={selectedItem}
            onImageSelect={handleImageSelect}
            onImageRotate={handleImageRotate}
            spaceId={selectedSpace?.id}
            selectedIcon={selectedIcon}
          />
        </Suspense>
        <EditButton onClick={handleEdit}>
          {isEditOpen ? '공간 저장' : '공간 편집'}
        </EditButton>
      </>
    );
  };

  return (
    <>
      <Header iconInside />

      <HomeContainer isEditOpen={isEditOpen}>
        <ContentWrapper isEditOpen={isEditOpen}>
          {renderContent()}
        </ContentWrapper>

        <EditSidebar
          isOpen={isEditOpen}
          onClose={handleCloseSidebar}
          images={draggableImages}
          newItem={newItem}
          setNewItem={setNewItem}
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
        />
      </HomeContainer>
    </>
  );
};

export default Home;

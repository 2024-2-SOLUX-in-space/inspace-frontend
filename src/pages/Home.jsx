import React, { useState } from 'react';
import HomeDiary from '../components/HomeDiary';
import EditSidebar from '../components/EditSidebar';
import SearchBar from '../components/SearchBar';
import { HomeContainer, ContentWrapper, EditButton } from '../styles/HomeStyle';

const initialDraggableImages = [
  { id: 'bear1', src: '/bear1.png', alt: '곰1' },
  { id: 'bear2', src: '/bear2.png', alt: '곰2' },
];

const Home = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [draggableImages, setDraggableImages] = useState(initialDraggableImages);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [diaryData, setDiaryData] = useState({
    images: []
  });
  const [diaryImages, setDiaryImages] = useState([]);

  const handleEdit = () => {
    setIsEditOpen(!isEditOpen);
  };

  const handleCloseSidebar = () => {
    setIsEditOpen(false);
  };

  const handleImageDrop = (pageNumber, x, y) => {
    const draggedImage = window.draggedImage;
    if (!draggedImage) return;

    const newImage = {
      id: `${draggedImage.id}-${Date.now()}`,
      url: draggedImage.src,
      alt: draggedImage.alt,
      pageNumber: pageNumber,
      width: draggedImage.width,
      height: draggedImage.height,
      position: { x, y },
      style: {
        width: draggedImage.width ? `${draggedImage.width}px` : 'auto',
        height: draggedImage.height ? `${draggedImage.height}px` : 'auto',
      },
    };

    setDiaryData(prev => ({
      ...prev,
      images: [...prev.images, newImage]
    }));

    setDraggableImages((prev) =>
      prev.filter((img) => img.id !== draggedImage.id),
    );

    window.draggedImage = null;
  };

  const handleImageResize = (imageId, newSize) => {
    setDiaryData(prev => ({
      ...prev,
      images: prev.images.map(img => 
        img.id === imageId 
          ? { 
              ...img, 
              style: { 
                ...img.style, 
                width: `${newSize.width}px`, 
                height: `${newSize.height}px` 
              } 
            }
          : img
      )
    }));
  };

  const handleImageSelect = (imageId) => {
    setSelectedImageId(imageId);
  };

  const handleImageRotate = (imageId, angle) => {
    setDiaryData(prev => ({
      ...prev,
      images: prev.images.map(img => 
        img.id === imageId 
          ? { ...img, rotation: angle }
          : img
      )
    }));
  };

  const handleImageMove = (imageId, newPageNumber, newPosition) => {
    setDiaryData(prev => ({
      ...prev,
      images: prev.images.map(img => 
        img.id === imageId 
          ? { 
              ...img, 
              pageNumber: newPageNumber,
              position: newPosition
            }
          : img
      )
    }));
  };

  return (
    <HomeContainer isEditOpen={isEditOpen}>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '70px',
          backgroundColor: 'white',
          zIndex: 1000,
          borderBottom: '1px solid #eee'
        }}
      >
        <SearchBar style={{ height: '60px', padding: '10px' }} iconInside />
      </div>
      <ContentWrapper isEditOpen={isEditOpen}>
        <HomeDiary 
          diaryData={diaryData} 
          setDiaryData={setDiaryData}
          onImageDrop={handleImageDrop}
          onImageResize={handleImageResize}
          onImageMove={handleImageMove}
          isEditMode={isEditOpen}
          selectedImageId={selectedImageId}
          onImageSelect={handleImageSelect}
          onImageRotate={handleImageRotate}
        />
        <EditButton onClick={handleEdit}>
          {isEditOpen ? '공간 저장' : '공간 편집'}
        </EditButton>
      </ContentWrapper>
      <EditSidebar
        isOpen={isEditOpen}
        onClose={handleCloseSidebar}
        images={draggableImages}
      />
    </HomeContainer>
  );
};

export default Home;

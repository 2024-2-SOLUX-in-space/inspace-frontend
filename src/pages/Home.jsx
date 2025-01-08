import React, { useState } from 'react';
import HomeDiary from '../components/HomeDiary';
import EditSidebar from '../components/EditSidebar';
import { HomeContainer, ContentWrapper, EditButton } from '../styles/HomeStyle';

const initialDraggableImages = [
  { id: 'bear1', src: '/bear1.png', alt: '곰1' },
  { id: 'bear2', src: '/bear2.png', alt: '곰2' }
];

const Home = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [draggableImages, setDraggableImages] = useState(initialDraggableImages);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [diaryData, setDiaryData] = useState({
    images: []
  });

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
        height: draggedImage.height ? `${draggedImage.height}px` : 'auto'
      }
    };

    setDiaryData(prev => ({
      ...prev,
      images: [...prev.images, newImage]
    }));

    setDraggableImages(prev => 
      prev.filter(img => img.id !== draggedImage.id)
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

  return (
    <HomeContainer isEditOpen={isEditOpen}>
      <ContentWrapper isEditOpen={isEditOpen}>
        <HomeDiary 
          diaryData={diaryData} 
          setDiaryData={setDiaryData}
          onImageDrop={handleImageDrop}
          onImageResize={handleImageResize}
          isEditMode={isEditOpen}
          selectedImageId={selectedImageId}
          onImageSelect={handleImageSelect}
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
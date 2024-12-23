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
  const [diaryImages, setDiaryImages] = useState({
    1: [],
    2: [],
    3: [],
    4: []
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
      position: { x, y }
    };

    setDiaryImages(prev => ({
      ...prev,
      [pageNumber]: [...prev[pageNumber], newImage]
    }));

    setDraggableImages(prev => 
      prev.filter(img => img.id !== draggedImage.id)
    );

    window.draggedImage = null;
  };

  return (
    <HomeContainer>
      <ContentWrapper>
        <HomeDiary 
          images={diaryImages} 
          onImageDrop={handleImageDrop}
        />
        <EditButton onClick={handleEdit}>
          공간 편집
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
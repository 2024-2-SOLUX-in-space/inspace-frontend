import React, { useState, useEffect, useContext } from 'react';
import HomeDiary from './HomeDiary';
import EditSidebar from '../../components/home/EditSidebar';
import Header from '../../components/Header';
import { HomeContainer, ContentWrapper, EditButton } from '../../styles/home/HomeStyle';
import api from '../../api/api';
import { SpaceContext } from '../../context/SpaceContext';

const initialDraggableImages = [
  { id: 'bear1', src: '/public/home/bear1.png', alt: '곰1' },
  { id: 'bear2', src: '/public/home/bear2.png', alt: '곰2' },
];

const Home = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [draggableImages, setDraggableImages] = useState(initialDraggableImages);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [diaryData, setDiaryData] = useState([]);
  const [diaryImages, setDiaryImages] = useState([]);
  const [selectedSpaceId, setSelectedSpaceId] = useState(null);
  const { selectedSpace } = useContext(SpaceContext);

  /* 페이지 출력 api
  useEffect(() => {
    if (selectedSpace.spaceId) {
      const fetchDiaryData = async () => {
        try {
          const response = await api.get(`/api/page`, {
            params: { space_id: selectedSpace.spaceId, pageNum: 1 }
          });
          setDiaryData(response.data);
        } catch (error) {
          console.error('Error fetching diary data:', error);
          setDiaryData([]);
        }
      };

      fetchDiaryData();
    }
  }, [selectedSpace.spaceId]);
*/
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
    <>
      <Header iconInside />
      <HomeContainer isEditOpen={isEditOpen}>
        <ContentWrapper isEditOpen={isEditOpen}>
          <HomeDiary
            diaryData={diaryData}
            onImageDrop={handleImageDrop}
            onImageResize={handleImageResize}
            onImageMove={handleImageMove}
            isEditMode={isEditOpen}
            selectedImageId={selectedImageId}
            onImageSelect={handleImageSelect}
            onImageRotate={handleImageRotate}
            spaceId={selectedSpaceId}
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
    </>
  );
};

export default Home;

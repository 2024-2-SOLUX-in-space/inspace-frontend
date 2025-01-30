import React, { useState, useContext } from 'react';
import HomeDiary from '../../components/home/HomeDiary';
import EditSidebar from '../../components/home/EditSidebar';
import Header from '../../components/Header';
import ImageAddModal from '../../pages/home/ImageAddModal';
import { HomeContainer, ContentWrapper, EditButton } from '../../styles/home/HomeStyle';
import { SpaceContext } from '../../context/SpaceContext';
import { useItemContext } from '../../context/ItemContext';

const Home = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [draggableImages, setDraggableImages] = useState([]);
  const [diaryData, setDiaryData] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [newItem, setNewItem] = useState(null);

  const { selectedSpace } = useContext(SpaceContext);
  const { selectedItem, setSelectedItem } = useItemContext();

  const handleEdit = () => {
    setIsEditOpen(!isEditOpen);
  };
  const handleCloseSidebar = () => {
    setIsEditOpen(false);
  };

  const handleFileSelected = (file) => {
    setSelectedFile(file);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
  };

  const handleAddItem = (createdItem) => {
    console.log('Home.jsx | handleAddItem - 새 아이템:', createdItem);
    setNewItem(createdItem);
    setIsModalOpen(false);
    setSelectedFile(null);
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
      [pageNumber]: [...(prev[pageNumber] || []), newImage],
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
            selectedImageId={selectedItem}
            onImageSelect={handleImageSelect}
            onImageRotate={handleImageRotate}
            spaceId={selectedSpace?.id}
          />
          <EditButton onClick={handleEdit}>
            {isEditOpen ? '공간 저장' : '공간 편집'}
          </EditButton>
        </ContentWrapper>

        <EditSidebar
          isOpen={isEditOpen}
          onClose={handleCloseSidebar}
          images={draggableImages}
          onFileSelected={handleFileSelected}
          newItem={newItem}
          setNewItem={setNewItem}
          isModalOpen={isModalOpen}
        />
        <ImageAddModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          imageFile={selectedFile}
          onSave={handleAddItem}
        />
      </HomeContainer>
    </>
  );
};

export default Home;

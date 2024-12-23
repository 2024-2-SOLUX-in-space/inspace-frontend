import React, { useState } from 'react';
import HomeDiary from '../components/HomeDiary';
import EditSidebar from '../components/EditSidebar.jsx';
import { HomeContainer, ContentWrapper, EditButton } from '../styles/HomeStyle';

const Home = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEdit = () => {
    setIsEditOpen(!isEditOpen);
  };

  const handleCloseSidebar = () => {
    setIsEditOpen(false);
  };

  return (
    <HomeContainer>
      <ContentWrapper>
        <HomeDiary />
        <EditButton onClick={handleEdit}>
          공간 편집
        </EditButton>
      </ContentWrapper>
      <EditSidebar 
        isOpen={isEditOpen} 
        onClose={handleCloseSidebar}
      />
    </HomeContainer>
  );
};

export default Home;
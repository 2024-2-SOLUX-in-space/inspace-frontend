import React from 'react';
import HomeDiary from '../components/HomeDiary';
import { HomeContainer, ContentWrapper, EditButton } from '../styles/HomeStyle';

const Home = () => {
  const handleEdit = () => {
    // 편집 기능 구현
  };

  return (
    <HomeContainer>
      <ContentWrapper>
        <HomeDiary />
        <EditButton onClick={handleEdit}>공간 편집</EditButton>
      </ContentWrapper>
    </HomeContainer>
  );
};

export default Home;
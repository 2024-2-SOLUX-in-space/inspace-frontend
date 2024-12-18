import React from 'react';
import styled from 'styled-components';
import HomeDiary from '../components/HomeDiary';

const HomeContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('/home_background.png') no-repeat center center;
  background-size: cover;
`;

const Home = () => {
  return (
    <HomeContainer>
      <HomeDiary />
    </HomeContainer>
  );
};

export default Home;
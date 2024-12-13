import React from 'react';
import { HomeContainer, BookImage, ArrowImage } from '../styles/HomeStyle';

const Home = () => {
  return (
    <HomeContainer>
      <ArrowImage src="/home_arrow_left.png" alt="왼쪽 화살표" />
      <BookImage src="/home_book.png" alt="책" />
      <ArrowImage src="/home_arrow_right.png" alt="오른쪽 화살표" />
    </HomeContainer>
  );
};

export default Home;

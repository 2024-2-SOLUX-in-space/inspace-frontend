import styled from 'styled-components';

export const HomeContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url('/home_background.png');
  background-size: 100% 100%;
  background-position: right center;
  background-repeat: no-repeat;
  margin: 0;
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const BookImage = styled.img`
  width: 48%;
  height: auto;
  object-fit: contain;
  position: relative;
`;

export const ArrowImage = styled.img`
  position: absolute;
  height: 50px;
  top: 0;
  bottom: 0;
  margin: auto 0;

  &:first-of-type {
    left: 425px;
  }

  &:last-of-type {
    right: 425px;
  }
`;

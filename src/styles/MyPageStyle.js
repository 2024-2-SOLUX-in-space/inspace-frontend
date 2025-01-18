// MyPageStyle.js
import styled from 'styled-components';

export const MyPageContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-image: url('/background.png');
  background-size: cover;
  background-position: center;
  font-family: 'SejongGeulggot', sans-serif;
`;

export const LogoutButton = styled.button`
  position: absolute;
  top: 5.5rem;
  right: 1.5rem;
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover:not(:disabled) {
    opacity: 0.8;
  }
`;

export const MyPageLeft = styled.div`
  flex: 5.5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MyPageLogo = styled.img`
  max-width: 70%;
  height: auto;
`;

export const MyPageRight = styled.div`
  flex: 4.5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  gap: 1.5rem;
  pointer-events: none;
  opacity: 0.8;
`;

export const EditButton = styled.button`
  background-color: transparent;
  padding: 1rem 2rem;
  font-size: 2rem;
  cursor: pointer;
  transition: opacity 0.3s ease;
  position: absolute;
  bottom: 3rem;
  right: 3rem;
  border: none;
  margin-top: 0;

  &:hover,
  &:focus,
  &:active {
    outline: 0;
    border: 0;
  }

  &:hover:not(:disabled) {
    opacity: 0.8;
  }

  &:disabled {
    background-color: transparent;
    opacity: 0.5;
    color: black;
  }
`;

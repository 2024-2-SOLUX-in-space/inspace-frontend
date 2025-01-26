// SignUpPageStyle.js
import styled from 'styled-components';

export const SignupContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-image: url('../../../public/background/background.png');
  background-size: cover;
  background-position: center;
  font-family: 'SejongGeulggot', sans-serif;
`;

/* 왼쪽 영역: 로고 */
export const SignupLeft = styled.div`
  flex: 5.5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* 로고 이미지 */
export const SignupLogo = styled.img`
  max-width: 60%;
  height: auto;
`;

/* 오른쪽 영역: 입력 폼 */
export const SignupRight = styled.div`
  flex: 4.5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  gap: 1.5rem;
  position: relative; /* 절대 위치 버튼을 위해 상대 위치 지정 */
`;

/* Join Now 버튼 */
export const JoinNowButton = styled.button`
  background-color: transparent;
  padding: 1rem 2rem;
  font-size: 2rem;
  cursor: pointer;
  transition: opacity 0.3s ease;
  position: absolute;
  bottom: 3rem;
  right: 3rem;
  margin-top: 0;
  outline: none;

  &:hover,
  &:focus,
  &:active {
    border: none;
    outline: none;
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

// MyPageEditStyle.js
import styled from 'styled-components';

export const MyPageEditContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-image: url('/background.png');
  background-size: cover;
  background-position: center;
  font-family: 'SejongGeulggot', sans-serif;
`;

/* 왼쪽 영역: 로고 */
export const MyPageEditLeft = styled.div`
  flex: 5.5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MyPageEditLogo = styled.img`
  max-width: 70%;
  height: auto;
`;

/* 오른쪽 영역: 입력 폼 */
export const MyPageEditRight = styled.div`
  flex: 4.5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  gap: 1.5rem;
`;

/* 이메일/비밀번호를 감싸는 컨테이너 */
export const DisabledTextField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  pointer-events: none;
  opacity: 0.8;
  cursor: default;

  /* 비밀번호 표시 버튼만 클릭 가능 */
  .my-textfield-icon {
    pointer-events: auto;
    cursor: pointer;
  }
`;

/* Cancel 버튼 */
export const CancelButton = styled.button`
  background-color: transparent;
  padding: 1rem 2rem;
  font-size: 2rem;
  cursor: pointer;
  transition: opacity 0.3s ease;
  position: absolute;
  bottom: 3rem;
  right: 10rem;
  border: none;
  margin-top: 0;

  &:hover,
  &:focus,
  &:active {
    outline: 0;
    border: 0;
  }

  &:hover {
    opacity: 0.8;
  }
`;

/* Save 버튼 */
export const SaveButton = styled.button`
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

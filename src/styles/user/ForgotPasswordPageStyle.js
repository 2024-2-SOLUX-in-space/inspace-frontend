// ForgotPasswordPageStyle.js
import styled from 'styled-components';

export const ForgotPasswordPageContainer = styled.div`
  background: url('../../../public/background/ForgotPasswordPage.png') no-repeat
    center center;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  position: relative;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

/* 회원가입 버튼 (페이지 우상단) */
export const SignupButton = styled.button`
  position: absolute;
  top: 0.3rem;
  right: 1rem;
  background: transparent;
  border: none;
  cursor: pointer;

  img {
    width: 15rem;
    height: auto;
    display: block;
  }

  &:hover,
  &:focus,
  &:active {
    border: none;
    outline: none;
  }
`;

/* 아래쪽 중앙에 배치할 컨테이너 */
export const ForgotPasswordCenterContainer = styled.div`
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

/* 이메일 입력창 + Go 버튼 감싸는 컨테이너 */
export const EmailContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

/* Go 버튼 */
export const GoButton = styled.button`
  position: absolute;
  right: 1.7rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s ease;
  padding: 0;

  img {
    width: 1.7rem;
    height: auto;
    display: block;
  }

  &:hover,
  &:focus,
  &:active {
    border: none;
    outline: none;
  }

  &:disabled {
    opacity: 0.3;
  }

  &:hover:not(:disabled) img {
    opacity: 0.8;
  }
`;

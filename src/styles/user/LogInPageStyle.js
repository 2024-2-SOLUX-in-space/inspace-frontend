// LogInPageStyle.js
import styled from 'styled-components';

export const LoginPageContainer = styled.div`
  background: url('../../../public/background/LogInPage.png') no-repeat center
    center;
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
  margin: 0;
  padding: 0;

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
export const BottomCenterContainer = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

/* Forgot Password와 Log In 버튼을 같은 줄에서 양쪽 배치 */
export const LoginActions = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-between;
`;

/* Forgot Password 버튼 */
export const ForgotPasswordButton = styled.button`
  background: transparent;
  border: none;
  color: #000000;
  cursor: pointer;
  font-size: 1.1rem;
  margin: 0;
  padding: 0;

  &:hover {
    opacity: 0.8;
  }

  &:hover,
  &:focus,
  &:active {
    border: none;
    outline: none;
  }
`;

/* Log In 버튼 */
export const LoginButton = styled.button`
  background: black;
  color: white;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  transition: opacity 0.3s ease;
  margin: 0;
  padding: 0.5rem;
  width: 90px;

  &:disabled {
    opacity: 0.3;
  }

  &:hover:not(:disabled) {
    opacity: 0.8;
  }
`;

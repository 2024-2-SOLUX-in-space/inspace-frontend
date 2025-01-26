// StartPageStyle.js
import styled from 'styled-components';

/* 전체 컨테이너 */
export const StartingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: url('../../../public/background/startpage.png') no-repeat center
    center/cover;
  position: relative;
`;

/* 버튼들을 하단 중앙에 고정시키는 컨테이너 */
export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0;
`;

/* 공통 버튼 스타일 */
const BaseButton = styled.button`
  background: transparent;
  padding: 0;
  cursor: pointer;
  border: none;
  outline: none;

  &:hover,
  &:focus,
  &:active {
    border: none;
    outline: none;
  }
`;

/* 버튼에 들어가는 이미지 스타일 */
export const ButtonImage = styled.img`
  width: 250px;
  height: auto;
  display: block;
`;

/* Log In 버튼 스타일 */
export const LogInButton = styled(BaseButton)`
  transform: rotate(-5.79deg);
  position: relative;
  bottom: 15px;
  left: 5px;
`;

/* Sign Up 버튼 스타일 */
export const SignUpButton = styled(BaseButton)`
  position: relative;
  left: -5px;
  margin-top: 30px;
`;

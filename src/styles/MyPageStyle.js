/* MyPage.css */
const myPageStyles = `
.mypage-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-image: url('/background.png');
  background-size: cover;
  background-position: center;
  font-family: 'SejongGeulggot', sans-serif;
}

/* 로그아웃 버튼 - 화면 왼쪽 상단 */
.logout-button {
  position: absolute;
  top: 10rem;
  right: 2rem;
  background-color: transparent;
  border: none;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

/* 로그아웃 버튼 hover 효과 */
.logout-button:hover:not(:disabled) {
  opacity: 0.8;
}

/* 왼쪽 영역: 프로필 또는 로고 */
.mypage-left {
  flex: 5.5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mypage-logo {
  max-width: 70%;
  height: auto;
}

/* 오른쪽 영역 */
.mypage-right {
  flex: 4.5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  gap: 1.5rem;
}

/* 공통 인풋 박스 스타일 */
.input-box {
  display: flex;
  flex-direction: column;
}

/* 정보 수정 버튼 */
.edit-button {
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
}
  
.edit-button:hover,
.edit-button:focus,
.edit-button:active {
  outline: 0;
  border: 0;
}

.edit-button:hover:not(:disabled) {
  opacity: 0.8;
}

.edit-button:disabled {
  background-color: transparent;
  opacity: 0.5;
  color: black;
}
`;

export default myPageStyles;

// myPageEditStyles.js
const myPageEditStyles = `
.mypage-edit-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-image: url('/background.png'); /* 백그라운드 이미지 예시 */
  background-size: cover;
  background-position: center;
  font-family: 'SejongGeulggot', sans-serif;
}

/* 왼쪽 영역: 로고 */
.mypage-edit-left {
  flex: 5.5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mypage-edit-logo {
  max-width: 70%;
  height: auto;
}

/* 오른쪽 영역: 입력 폼 */
.mypage-edit-right {
  flex: 4.5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  gap: 1.5rem;
}

/* Cancel 버튼 */
.cancel-button {
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
}

.cancel-button:hover,
.cancel-button:focus,
.cancel-button:active {
  outline: 0;
  border: 0;
}

.cancel-button:hover {
  opacity: 0.8;
}

/* Save 버튼 */
.save-button {
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

.save-button:hover,
.save-button:focus,
.save-button:active {
  outline: 0;
  border: 0;
}

.save-button:hover:not(:disabled) {
  opacity: 0.8;
}

.save-button:disabled {
  background-color: transparent;
  opacity: 0.5;
  color: black;
}
`;

export default myPageEditStyles;

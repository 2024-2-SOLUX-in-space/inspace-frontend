// SignUpPage.js

const signUpPageStyles = `
.signup-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-image: url('../../../public/background/background.png');
  background-size: cover;
  background-position: center;
  font-family: 'SejongGeulggot', sans-serif;
}

/* 왼쪽 영역: 로고 */
.signup-left {
  flex: 5.5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.signup-logo {
  max-width: 60%;
  height: auto;
}

/* 오른쪽 영역: 입력 폼 */
.signup-right {
  flex: 4.5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  gap: 1.5rem;
}

/* 각 입력 영역 */
.input-box {
  display: flex;
  flex-direction: column;
}

/* Join Now 버튼 */
.join-now-button {
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
}

.join-now-button:hover,
.join-now-button:focus,
.join-now-button:active {
  border: none;
  outline: none;
}

.join-now-button:hover:not(:disabled) {
  opacity: 0.8;
}

.join-now-button:disabled {
  background-color: transparent;
  opacity: 0.5;
  color: black;
}
`;

export default signUpPageStyles;

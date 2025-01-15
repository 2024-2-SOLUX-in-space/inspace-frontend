// LogInPageStyle.js

const logInPageStyles = `
.login-page {
  background: url('/LogInPage.png') no-repeat center center;
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
}

/* 회원가입 버튼 (페이지 우상단) */
.signup-button {
  position: absolute;
  top: 0.3rem;
  right: 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
  margin: 0;
  padding: 0;
}

.signup-button img {
  width: 15rem;
  height: auto;
  display: block;
}

.signup-button:hover,
.signup-button:focus,
.signup-button:active {
  border: none;
  outline: none;
}

/* 아래쪽 중앙에 배치할 컨테이너 */
.bottom-center-container {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

/* Forgot Password와 Log In 버튼을 같은 줄에서 양쪽 배치 */
.login-actions {
  width: 400px;
  display: flex;
  justify-content: space-between;
}

/* Forgot Password 버튼 */
.forgot-password-button {
  background: transparent;
  border: none;
  color: #000000;
  cursor: pointer;
  font-size: 1.1rem;
  margin: 0;
  padding: 0;
}

.forgot-password-button:hover {
  opacity: 0.8;
}

.forgot-password-button:hover,
.forgot-password-button:focus,
.forgot-password-button:active {
  border: none;
  outline: none;
}

/* Log In 버튼 */
.login-button {
  background: black;
  color: white;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  transition: opacity 0.3s ease;
  margin: 0;
  padding: 0.5rem;
  width: 90px;
}

.login-button:disabled {
  opacity: 0.3;
}

.login-button:hover:not(:disabled) {
  opacity: 0.8;
}
`;

export default logInPageStyles;
// ForgotPasswordPageStyle.js

const forgotPasswordPageStyles = `
.forgot-password-page {
  background: url('/ForgotPasswordPage.png') no-repeat center center;
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
}

/* 회원가입 버튼 내부 이미지 크기 */
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
.forgot-password-center-container {
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

/* 이메일 입력창 + Go 버튼 감싸는 컨테이너 */
.email-container {
  position: relative;
  display: flex;
  align-items: center;
}

/* Go 버튼 */
.go-button {
  position: absolute;
  right: 1.7rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s ease;
  padding: 0;
}

/* Go 버튼 내부 이미지 크기 */
.go-button img {
  width: 1.7rem;
  height: auto;
  display: block;
}

.go-button:hover,
.go-button:focus,
.go-button:active {
  border: none;
  outline: none;
}

/* Go 버튼이 비활성화되었을 때 회색으로 변경 */
.go-button:disabled {
  opacity: 0.3;
}

/* Go 버튼 호버 효과 */
.go-button:hover:not(:disabled) img {
  opacity: 0.8;
}
`;

export default forgotPasswordPageStyles;

// LandingPageStyle.js

const landingPageStyle = `
.landing-container {
  width: 100vw;
  height: 100vh;
  background: url('/LandingPage.png') no-repeat center center/cover;
  position: relative;
}

/* 버튼들을 하단 중앙에 고정시키기 */
.button-container {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0;
}

/* 버튼 기본 스타일 */
.button {
  background: transparent;
  padding: 0;
  cursor: pointer;
  border: none;
  outline: none;
}

.button:hover,
.button:focus,
.button:active {
  border: none;
  outline: none;
}

/* 버튼에 들어가는 이미지 스타일 */
.button-image {
  width: 250px;
  height: auto;
  display: block;
}

/* sign-in 버튼 스타일 */
.sign-in-button {
  transform: rotate(-5.79deg);
  position: relative;
  bottom: 20px;
  left: 5px;
}

/* sign-up 버튼 스타일 */
.sign-up-button {
  position: relative;
  left: -5px;
  margin-top: 30px;
}
`;

export default landingPageStyle;

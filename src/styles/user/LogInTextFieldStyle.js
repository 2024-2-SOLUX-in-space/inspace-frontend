// LogInTextFieldStyle.js

const logInTextFieldStyles = `
.logintextfield-container {
  position: relative;
  display: inline-block;
  margin: 1rem;
}

/* 라벨을 좌상단 바깥쪽에 배치 */
.logintextfield-label {
  position: absolute;
  top: -2rem;
  left: 0;
  padding: 0 0.25rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: #000000;
  pointer-events: none;
  font-family: 'SejongGeulggot', sans-serif;
}

/* 인풋 + 아이콘을 함께 감쌀 래퍼 */
.logintextfield-wrapper {
  position: relative;
}

/* 텍스트필드 자체 */
.logintextfield-input {
  width: 400px;
  padding: 0.75rem 2.5rem 0.75rem 0.75rem; /* 오른쪽 여백을 주어 아이콘과 겹치지 않게 */
  border: 2px solid #000000;
  border-radius: 10px;
  font-size: 1rem;
  box-sizing: border-box;
  background: none;
  outline: none;
  font-family: 'SejongGeulggot', sans-serif;
}

/* 아이콘 (눈 모양) 위치 */
.logintextfield-icon {
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.logintextfield-icon:hover {
  opacity: 1;
}
`;

export default logInTextFieldStyles;

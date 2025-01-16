// TextFieldStyle.js

const textFieldStyles = `
.my-textfield-container {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 450px; /* TextField 전체 너비 */
}

.my-textfield-label {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  font-family: 'SejongGeulggot', sans-serif;
}

.my-textfield-wrapper {
  position: relative;
}

.my-textfield-input {
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 0.75rem;
  border: 2px solid #555555;
  border-radius: 10px;
  font-size: 1rem;
  box-sizing: border-box;
  outline: none;
  font-family: 'SejongGeulggot', sans-serif;
  background: none;
}

.my-textfield-input:focus {
  border:2px solid #000000;
}

/* 비밀번호 아이콘 위치 조절 */
.my-textfield-icon {
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

.my-textfield-icon:hover {
  opacity: 1;
}
`;

export default textFieldStyles;

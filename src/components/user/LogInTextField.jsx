// LogInTextField.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import InvisibleButton from '../../assets/img/button/InvisibleButton.png';
import VisibleButton from '../../assets/img/button/VisibleButton.png';

const Container = styled.div`
  position: relative;
  display: inline-block;
  margin: 1rem;
`;

/* 라벨을 좌상단 바깥쪽에 배치 */
const Label = styled.div`
  position: absolute;
  top: -2rem;
  left: 0;
  padding: 0 0.25rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: #000000;
  pointer-events: none;
  font-family: 'SejongGeulggot', sans-serif;
`;

/* 인풋 + 아이콘을 함께 감쌀 래퍼 */
const Wrapper = styled.div`
  position: relative;
`;

/* 텍스트필드 자체 */
const Input = styled.input`
  width: 400px;
  padding: 0.75rem 2.5rem 0.75rem 0.75rem; /* 오른쪽 여백을 주어 아이콘과 겹치지 않게 */
  border: 2px solid #000000;
  border-radius: 10px;
  font-size: 1rem;
  box-sizing: border-box;
  background: none;
  outline: none;
  font-family: 'SejongGeulggot', sans-serif;
`;

/* 비밀번호 아이콘 위치 */
const Icon = styled.img`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

function LogInTextField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  onKeyPress,
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const inputType =
    type === 'password' ? (isPasswordVisible ? 'text' : 'password') : type;

  const handleInputChange = (e) => {
    onChange(e);
  };

  return (
    <Container>
      <Label>{label}</Label>
      <Wrapper>
        <Input
          type={inputType}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          onKeyPress={onKeyPress}
        />
        {type === 'password' && (
          <Icon
            src={isPasswordVisible ? InvisibleButton : VisibleButton}
            alt={isPasswordVisible ? 'Invisible' : 'Visible'}
            onClick={togglePasswordVisibility}
          />
        )}
      </Wrapper>
    </Container>
  );
}

export default LogInTextField;

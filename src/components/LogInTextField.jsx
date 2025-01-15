// LogInTextField.jsx
import React, { useState } from 'react';
import InvisibleButton from '../assets/InvisibleButton.png';
import VisibleButton from '../assets/VisibleButton.png';
import logInTextFieldStyles from '../styles/LogInTextFieldStyle.js';

function LogInTextField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  onKeyPress,
}) {
  // 비밀번호 표시 여부
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // 클릭 시 비밀번호 표시 토글
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  // 실제로 input 태그에 적용될 type 결정
  const inputType =
    type === 'password' ? (isPasswordVisible ? 'text' : 'password') : type;

  const handleInputChange = (e) => {
    onChange(e);
  };

  return (
    <>
      <style>{logInTextFieldStyles}</style>

      <div className="logintextfield-container">
        <div className="logintextfield-label">{label}</div>

        {/* 텍스트필드와 아이콘을 함께 감쌀 래퍼 */}
        <div className="logintextfield-wrapper">
          <input
            className="logintextfield-input"
            type={inputType}
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            onKeyPress={onKeyPress}
          />

          {/* 비밀번호 전용 아이콘 */}
          {type === 'password' && (
            <img
              className="logintextfield-icon"
              src={isPasswordVisible ? InvisibleButton : VisibleButton}
              alt={isPasswordVisible ? 'Invisible' : 'Visible'}
              onClick={togglePasswordVisibility}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default LogInTextField;

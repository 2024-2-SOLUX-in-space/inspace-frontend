// LogInTextField.jsx
import React, { useState } from 'react';
import InvisibleButtonIcon from '../assets/InvisibleButton.png';
import VisibleButtonIcon from '../assets/VisibleButton.png';
import logInTextFieldStyles from '../styles/LogInTextFieldStyle.js';

function LogInTextField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  onKeyPress, // 엔터키 처리를 위해 상위에서 넘겨받을 prop
}) {
  // 비밀번호 표시 여부
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // 마우스를 누르고 있는 동안만 비밀번호를 보이도록
  const handleMouseDown = () => {
    setIsPasswordVisible(true);
  };

  const handleMouseUp = () => {
    setIsPasswordVisible(false);
  };

  const handleMouseLeave = () => {
    setIsPasswordVisible(false);
  };

  const handleInputChange = (e) => {
    onChange(e);
  };

  // 실제 input 태그에 적용할 type 결정
  // password이면서 isPasswordVisible=false이면 'password', 아니면 'text'
  const inputType =
    type === 'password' && !isPasswordVisible ? 'password' : 'text';

  return (
    <>
      <style>{logInTextFieldStyles}</style>

      <div className="logintextfield-container">
        <div className="logintextfield-label">{label}</div>

        {/* 비밀번호 필드와 아이콘을 같이 담을 래퍼 */}
        <div className="logintextfield-wrapper">
          <input
            className="logintextfield-input"
            type={inputType}
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            onKeyPress={onKeyPress} // 엔터키 처리 콜백
          />

          {/* 비밀번호 필드일 때만 아이콘 표시 */}
          {type === 'password' && (
            <img
              className="logintextfield-icon"
              src={isPasswordVisible ? VisibleButtonIcon : InvisibleButtonIcon}
              alt={isPasswordVisible ? 'Visible' : 'Invisible'}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default LogInTextField;

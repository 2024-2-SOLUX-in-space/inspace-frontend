// TextField.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InvisibleButton from '../../assets/img/button/InvisibleButton.png';
import VisibleButton from '../../assets/img/button/VisibleButton.png';
import textFieldStyles from '../../styles/user/TextFieldStyle.js';

function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  maxLength,
}) {
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
      <style>{textFieldStyles}</style>

      <div className="my-textfield-container">
        <div className="my-textfield-label">{label}</div>
        <div className="my-textfield-wrapper">
          <input
            className="my-textfield-input"
            type={inputType}
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            maxLength={maxLength}
          />

          {type === 'password' && (
            <img
              className="my-textfield-icon"
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

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
};

export default TextField;

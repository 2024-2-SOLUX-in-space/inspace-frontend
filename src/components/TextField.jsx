// TextField.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/TextField.css';
import InvisibleButton from '../assets/InvisibleButton.png';
import VisibleButton from '../assets/VisibleButton.png';

function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  maxLength,
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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

  // 실제로 input 태그에 적용될 type 결정
  // password field이면서 isPasswordVisible=true이면 'text', 아니면 'password'
  const inputType =
    type === 'password' ? (isPasswordVisible ? 'text' : 'password') : type;

  return (
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
            src={isPasswordVisible ? VisibleButton : InvisibleButton}
            alt={isPasswordVisible ? 'Visible' : 'Invisible'}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          />
        )}
      </div>
    </div>
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

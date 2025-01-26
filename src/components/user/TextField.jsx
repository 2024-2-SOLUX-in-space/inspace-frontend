// TextField.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import InvisibleButton from '../../assets/img/button/InvisibleButton.png';
import VisibleButton from '../../assets/img/button/VisibleButton.png';

const MyTextfieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 450px;
`;

const MyTextfieldLabel = styled.label`
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  font-family: 'SejongGeulggot', sans-serif;
`;

const MyTextfieldWrapper = styled.div`
  position: relative;
`;

const MyTextfieldInput = styled.input`
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 0.75rem;
  border: 2px solid #555555;
  border-radius: 10px;
  font-size: 1rem;
  box-sizing: border-box;
  outline: none;
  font-family: 'SejongGeulggot', sans-serif;
  background: none;

  &:focus {
    border: 2px solid #000000;
  }
`;

const MyTextfieldIcon = styled.img`
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

function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  maxLength,
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
    <MyTextfieldContainer>
      <MyTextfieldLabel>{label}</MyTextfieldLabel>
      <MyTextfieldWrapper>
        <MyTextfieldInput
          type={inputType}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          maxLength={maxLength}
        />

        {type === 'password' && (
          <MyTextfieldIcon
            src={isPasswordVisible ? InvisibleButton : VisibleButton}
            alt={isPasswordVisible ? 'Hide Password' : 'Show Password'}
            onClick={togglePasswordVisibility}
          />
        )}
      </MyTextfieldWrapper>
    </MyTextfieldContainer>
  );
}

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
};

export default TextField;

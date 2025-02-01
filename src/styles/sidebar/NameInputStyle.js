import styled from 'styled-components';

export const NameInputOverlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding-top: 10vh;
`;

export const NameInputBackground = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 75px;
  right: 0;
  bottom: 0;
`;

export const NameInputContainer = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  width: 450px;
  height: 250px;
  margin: 0 1rem;
  position: relative;
  z-index: 10;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const NameInputHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  position: relative;
`;

export const NameInputTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
`;

export const CloseButton = styled.button`
  position: absolute;
  background: none;
  border: none;

  top: 0.45rem;
  right: 0.28rem;

  color: #000;
  font-size: 1.1rem;
  cursor: pointer;

  &:hover {
    color: #555;
    outline: none;
  }

  &:focus {
    outline: none;
  }

  z-index: 60;
`;

export const BackButton = styled.button`
  position: absolute;
  top: 0.45rem;
  left: 0.28rem;
  background: none;
  border: none;
  font-size: 1.27rem;
  color: #000;
  cursor: pointer;

  &:hover {
    color: #555;
    outline: none;
  }

  &:focus {
    outline: none;
  }

  z-index: 60;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  outline: none;

  &:focus {
    border-color: black;
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;

  input[type='checkbox'] {
    appearance: none;
    width: 17px;
    height: 17px;
    border-radius: 4px;
    border: 1.5px solid black;
    background-color: white;
    cursor: pointer;
    position: relative;

    &:checked {
      background-color: black;
      &::after {
        content: '✓';
        color: white;
        font-size: 13px;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
`;

export const CheckboxLabel = styled.label`
  margin-left: 0.5rem;
  font-size: 0.875rem;
  color: black;
`;

export const NextButton = styled.button`
  background-color: #171717;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  cursor: pointer;
  display: block;
  margin-left: auto;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
  }
`;

export const DescriptionText = styled.p`
  font-size: 0.875rem;
  color: #777;
  margin-bottom: 0rem;
  margin-left: 1.2rem;
`;

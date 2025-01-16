import styled from "styled-components";

export const NameInputContainer = styled.div`
  position: fixed;
  top: 20%;
  left: 30%;
  width: 40%;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 2000;
  text-align: center;

  h2 {
    margin-bottom: 20px;
    font-size: 1.5em;
    color: #333;
  }
`;

export const InputField = styled.input`
  width: 80%;
  padding: 10px;
  margin: 10px 0;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

export const CheckboxContainer = styled.div`
  margin: 15px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CheckboxLabel = styled.label`
  margin-left: 10px;
  font-size: 0.9em;
  color: #555;
`;

export const NextButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

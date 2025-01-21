import styled from "styled-components";

export const PublicSelectionOverlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding-top: 10vh;
`;

export const PublicSelectionBackground = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 75px;
  right: 0;
  bottom: 0;
`;

export const PublicSelectionContent = styled.div`
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

export const PublicSelectionHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  position: relative;
`;

export const PublicSelectionTitle = styled.h3`
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

  &:focus{
  outline: none;}

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
  outline: none;}

  z-index: 60;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px;
  margin-top: 3.5rem;
  margin-bottom: 1.5rem;
`;

export const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  color: ${(props) => (props.isSelected ? "#000000" : "#bdbdbd")};
  transition: color 0.3s;

  & > span {
    margin-top: 10px;
    font-size: 1.0rem;
  }
`;

export const ConfirmButton = styled.button`
  background-color: black;
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
`;


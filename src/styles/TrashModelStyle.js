import styled from "styled-components";

export const TrashButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  color: red;
  font-size: 17px;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin-right: 10px;
  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s ease-in-out;
  }
`;
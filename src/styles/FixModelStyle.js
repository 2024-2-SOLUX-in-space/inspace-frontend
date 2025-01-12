import styled from "styled-components";

export const PinButton = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
  margin-right: 5px;

  filter: ${({ isPinned }) =>
    isPinned ? "invert(20%) sepia(0%) saturate(0%) hue-rotate(0deg)" : "invert(60%) sepia(10%) saturate(300%) hue-rotate(180deg)"};

  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s ease-in-out;
  }
`;

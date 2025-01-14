import styled from "styled-components";

export const PinButton = styled.img`
  width: 15px;
  height: 15px;
  cursor: pointer;
  margin-left: 6px;
  margin-right: 0px; /* 핀버튼 ~ 제목 */

  filter: ${({ isPinned }) =>
    isPinned 
      ? "invert(20%) sepia(0%) saturate(0%) hue-rotate(0deg)" 
      : "invert(60%) sepia(10%) saturate(300%) hue-rotate(180deg)"};

  &:hover {
    filter:  invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg);
    transition: transform 0.2s ease-in-out;
  }
`;

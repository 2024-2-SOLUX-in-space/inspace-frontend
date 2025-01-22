import React from "react";
import styled from "styled-components";

const PinButton = styled.img`
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

const FixModal = ({ id, isPinned, onPinToggle }) => {
  return (
    <PinButton 
      src="/src/assets/img/button/pinbutton.png"
      alt={`공간 ${id} 핀버튼`}
      isPinned={isPinned}
      onClick={() => onPinToggle(id)} 
    />
  );
};

export default FixModal;
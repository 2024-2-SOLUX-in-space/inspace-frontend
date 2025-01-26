import React from "react";
import styled from "styled-components";
import { FiBook, FiBookOpen } from "react-icons/fi";

const SwitchButton = styled.div`
  cursor: pointer;
  display: flex;
  margin-right: 3px; /* 책 ~ 쓰레기통 */
  font-size: 17px;
  align-items: center;
  justify-content: center;
  padding: 5px;

  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s ease-in-out;
  }
`;

const SwitchModal = ({ spaceId, isPublic, onSwitchToggle }) => {
  const handleClick = () => {
    onSwitchToggle(spaceId);
  };

  return (
    <SwitchButton onClick={handleClick}>
      {isPublic ? <FiBookOpen /> : <FiBook />}
    </SwitchButton>
  );
};

export default SwitchModal;
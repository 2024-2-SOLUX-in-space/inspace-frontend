import React from 'react';
import styled from 'styled-components';

export const ClickedHome = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 5px;

  background-color: ${({ isActive }) => 
    isActive ? "#ECECEC" : "transparent"};
  transition: background-color 0.2s ease-in-out;

  position: absolute;
  top: 175px;
  left: 15px;
  z-index: -1000; 
`
const HomeButton = ({ isHomeOpen }) => {
    return (
      <ClickedHome isActive={isHomeOpen}>
      </ClickedHome>
    );
  };

export default HomeButton;
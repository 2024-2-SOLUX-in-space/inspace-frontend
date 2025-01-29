import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const ClickedHome = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
`
const HomeButton = ({ isHomeOpen, toggleHome }) => {
    return (
      <ClickedHome isActive={isHomeOpen} onClick={toggleHome}>
      </ClickedHome>
    );
  };

export default HomeButton;

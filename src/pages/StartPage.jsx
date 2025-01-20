// StartPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpButtonImg from '../assets/img/button/SignUpButton.png';
import LogInButtonImg from '../assets/img/button/LogInButton.png';

// styled-components로 만든 컴포넌트 import
import {
  StartingContainer,
  ButtonContainer,
  LogInButton,
  SignUpButton,
  ButtonImage,
} from '../styles/StartPageStyle.js';

function StartPage() {
  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate('/signup');
  };

  const goToLogIn = () => {
    navigate('/login');
  };

  return (
    <StartingContainer>
      <ButtonContainer>
        <LogInButton onClick={goToLogIn}>
          <ButtonImage src={LogInButtonImg} alt="Log In" />
        </LogInButton>
        <SignUpButton onClick={goToSignUp}>
          <ButtonImage src={SignUpButtonImg} alt="Sign Up" />
        </SignUpButton>
      </ButtonContainer>
    </StartingContainer>
  );
}

export default StartPage;

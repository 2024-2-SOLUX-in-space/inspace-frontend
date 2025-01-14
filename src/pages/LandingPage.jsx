import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';
import SignUpButtonImg from '../assets/SignUpButton.png';
import LogInButtonImg from '../assets/LogInButton.png';

function LandingPage() {
  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate('/signup');
  };

  const goToLogIn = () => {
    navigate('/login');
  };

  return (
    <div className="landing-container">
      <div className="button-container">
        <button className="button log-in-button" onClick={goToLogIn}>
          <img src={LogInButtonImg} alt="Log In" className="button-image" />
        </button>
        <button className="button sign-up-button" onClick={goToSignUp}>
          <img src={SignUpButtonImg} alt="Sign Up" className="button-image" />
        </button>
      </div>
    </div>
  );
}

export default LandingPage;

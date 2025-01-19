// LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpButtonImg from '../assets/img/button/SignUpButton.png';
import LogInButtonImg from '../assets/img/button/LogInButton.png';
import StartPageStyle from '../styles/StartPageStyle.js';

function StartPage() {
  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate('/signup');
  };

  const goToLogIn = () => {
    navigate('/login');
  };

  return (
    <>
      <style>{StartPageStyle}</style>

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
    </>
  );
}

export default StartPage;

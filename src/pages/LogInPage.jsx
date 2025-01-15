// LogInPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogInTextField from '../components/LogInTextField';
import SignUpButtonImg from '../assets/SignUpButton.png';
import logInPageStyles from '../styles/LogInPageStyle.js';

function LogInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate('/signup');
  };

  const goToForgotPassword = () => {
    navigate('/forgot-password');
  };

  const emailRegex = /^[A-Za-z0-9@._-]+$/;
  const passwordRegex = /^[A-Za-z0-9]+$/;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    if (emailRegex.test(value) || value === '') {
      setEmail(value);
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (passwordRegex.test(value) || value === '') {
      setPassword(value);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) return;
    navigate('/home');
  };

  return (
    <>
      <style>{logInPageStyles}</style>

      <div className="login-page">
        {/* 페이지 우상단 회원가입 버튼 */}
        <button
          className="signup-button"
          onClick={goToSignUp}
          aria-label="Sign Up"
        >
          <img src={SignUpButtonImg} alt="Sign Up" />
        </button>

        {/* 아래쪽 중앙에 배치할 컨테이너 */}
        <div className="bottom-center-container">
          <LogInTextField
            label="Email"
            value={email}
            onChange={handleEmailChange}
            placeholder="inspace@gmail.com"
            type="text"
            onKeyPress={handleKeyPress}
          />

          <LogInTextField
            label="Password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호를 입력해주세요."
            type="password"
            onKeyPress={handleKeyPress}
          />

          {/* Forgot Password와 Log In 버튼을 한 줄에 배치 */}
          <div className="login-actions">
            <button
              className="forgot-password-button"
              onClick={goToForgotPassword}
            >
              Forgot Password?
            </button>

            {/* Log In 버튼 */}
            <button
              className="login-button"
              onClick={handleLogin}
              disabled={!email.trim() || !password.trim()}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogInPage;

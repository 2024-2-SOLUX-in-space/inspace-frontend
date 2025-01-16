// LogInPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import LogInTextField from '../components/LogInTextField';
import SignUpButtonImg from '../assets/SignUpButton.png';
import logInPageStyles from '../styles/LogInPageStyle.js';

function LogInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setUser } = useUser(); // 전역 user 상태를 업데이트할 수 있는 setUser
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

    // 전역 상태에 이메일, 비밀번호 저장 (닉네임은 아직 모르는 상태이므로 빈값이거나 추후 설정)
    setUser((prev) => ({
      ...prev,
      email,
      password,
      // nickname: '' // 필요하다면
    }));

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

          <div className="login-actions">
            <button
              className="forgot-password-button"
              onClick={goToForgotPassword}
            >
              Forgot Password?
            </button>
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

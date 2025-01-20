// LogInPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import LogInTextField from '../../components/user/LogInTextField';
import SignUpButtonImg from '../../assets/img/button/SignUpButton.png';
import {
  LoginPageContainer,
  SignupButton,
  BottomCenterContainer,
  LoginActions,
  ForgotPasswordButton,
  LoginButton,
} from '../../styles/user/LogInPageStyle';

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

    // 전역 상태에 이메일, 비밀번호 저장
    setUser((prev) => ({
      ...prev,
      email,
      password,
    }));

    navigate('/home');
  };

  return (
    <LoginPageContainer>
      <SignupButton onClick={goToSignUp} aria-label="Sign Up">
        <img src={SignUpButtonImg} alt="Sign Up" />
      </SignupButton>

      <BottomCenterContainer>
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

        <LoginActions>
          <ForgotPasswordButton onClick={goToForgotPassword}>
            Forgot Password?
          </ForgotPasswordButton>
          <LoginButton
            onClick={handleLogin}
            disabled={!email.trim() || !password.trim()}
          >
            Log In
          </LoginButton>
        </LoginActions>
      </BottomCenterContainer>
    </LoginPageContainer>
  );
}

export default LogInPage;

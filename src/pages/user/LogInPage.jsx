// LogInPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useUser } from '../../context/UserContext';
import { useAlert } from '../../context/AlertContext';
import api from '../../api/api.js';
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
import { fetchSpaces, setActiveSpace } from '../../redux/actions/spaceActions';

function LogInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setUser } = useUser(); // 전역 user 상태를 업데이트할 수 있는 setUser
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const spaces = useSelector((state) => state.space.spaces);

  const goToSignUp = () => {
    navigate('/signup');
  };

  const goToForgotPassword = () => {
    navigate('/forgot-password');
  };

  const emailRegex = /^[A-Za-z0-9@._-]+$/;
  const passwordRegex = /^[A-Za-z0-9!@#$%^&*]*$/;

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

  const handleLogin = async () => {
    if (!email.trim()) {
      showAlert('이메일을 입력해주세요.');
      return;
    }
    if (!password.trim()) {
      showAlert('비밀번호를 입력해주세요.');
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      showAlert('올바른 이메일을 입력해주세요.');
      return;
    }

    try {
      const response = await api.post('/api/auth/login', {
        email,
        password,
      });
      console.log(response);

      if (response.data.success) {
        const { access_token, refresh_token, email } = response.data.data;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);

        // 전역 상태 업데이트
        setUser((prev) => ({
          email: email,
          ...prev,
        }));

        // 공간 목록 업데이트
        await dispatch(fetchSpaces());

        navigate('/home');
      } else {
        showAlert(response.data.message);
      }
    } catch (error) {
      console.log('error: ', error);
      showAlert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <LoginPageContainer>
      {/* 페이지 우상단 회원가입 버튼 */}
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
          <LoginButton onClick={handleLogin}>Log In</LoginButton>
        </LoginActions>
      </BottomCenterContainer>
    </LoginPageContainer>
  );
}

export default LogInPage;

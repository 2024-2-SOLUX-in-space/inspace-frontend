// SignUpPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../context/AlertContext';
import TextField from '../../components/user/TextField';
import SignUpLogo from '../../assets/img/logo/signupLogo.png';
import api from '../../api/api.js';

import {
  SignupContainer,
  SignupLeft,
  SignupLogo as StyledSignupLogo,
  SignupRight,
  JoinNowButton,
} from '../../styles/user/SignUpPageStyle.js';

function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const handleJoin = async () => {
    if (!name.trim()) {
      showAlert('닉네임을 입력해주세요.');
      return;
    }
    if (!email.trim()) {
      showAlert('이메일을 입력해주세요.');
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      showAlert('올바른 이메일을 입력해주세요.');
      return;
    }
    if (!password.trim()) {
      showAlert('비밀번호를 입력해주세요.');
      return;
    }
    if (password.length < 8 || password.length > 20) {
      showAlert('비밀번호는 8자 이상 20자 이하여야 합니다.');
      return;
    }
    if (!passwordConfirmation.trim()) {
      showAlert('비밀번호를 확인해주세요.');
      return;
    }
    if (password !== passwordConfirmation) {
      showAlert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await api.post('/api/auth/signup', {
        name,
        email,
        password,
        passwordConfirmation,
      });

      if (response.data.success) {
        showAlert(
          response.data.message,
          () => navigate('/login'),
          '로그인하러 가기',
        );
      } else {
        showAlert(response.data.message);
      }
    } catch (error) {
      showAlert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const emailRegex = /^[A-Za-z0-9@._-]+$/;
  const passwordRegex = /^[A-Za-z0-9!@#$%^&*]*$/;

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setName(value);
    }
  };

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

  const handlePasswordConfirmationChange = (e) => {
    const value = e.target.value;
    if (passwordRegex.test(value) || value === '') {
      setPasswordConfirmation(value);
    }
  };

  return (
    <SignupContainer>
      {/* 왼쪽: Sign Up 로고 */}
      <SignupLeft>
        <StyledSignupLogo src={SignUpLogo} alt="Sign Up Logo" />
      </SignupLeft>

      {/* 오른쪽: 폼 영역 */}
      <SignupRight>
        <TextField
          label="Nickname"
          value={name}
          onChange={handleNameChange}
          placeholder="10자 이내의 닉네임"
          maxLength={10}
        />
        <TextField
          label="Email"
          value={email}
          onChange={handleEmailChange}
          placeholder="inspace@gmail.com"
          maxLength={50}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="8~20자 사이의 비밀번호를 입력해주세요."
          maxLength={20}
        />
        <TextField
          label="Confirm Password"
          type="password"
          value={passwordConfirmation}
          onChange={handlePasswordConfirmationChange}
          placeholder="다시 한 번 입력해주세요."
          maxLength={20}
        />

        <JoinNowButton onClick={handleJoin} aria-label="Join Right Now">
          Join Right Now
        </JoinNowButton>
      </SignupRight>
    </SignupContainer>
  );
}

export default SignUpPage;

// ForgotPasswordPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../context/AlertContext';
import LogInTextField from '../../components/user/LogInTextField';
import SignUpButtonImg from '../../assets/img/button/SignUpButton.png';
import GoButtonImg from '../../assets/img/button/GoButton.png';
import api from '../../api/api.js';
import {
  ForgotPasswordPageContainer,
  SignupButton,
  ForgotPasswordCenterContainer,
  EmailContainer,
  GoButton,
} from '../../styles/user/ForgotPasswordPageStyle';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const goToSignUp = () => {
    navigate('/signup');
  };

  const handleGoClick = async () => {
    try {
      const response = await api.post('/api/auth/forgot-password', {
        email,
      });
      console.log('email: ', email);
      console.log(response);

      const { success, message } = response.data;

      if (success) {
        showAlert(message, () => navigate('/login'), '로그인하러 가기');
      } else {
        showAlert(message, undefined, '확인');
      }
    } catch (error) {
      showAlert('요청 중 오류가 발생했습니다.', undefined, '확인');
    }
  };

  const emailRegex = /^[A-Za-z0-9@._-]+$/;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    if (emailRegex.test(value) || value === '') {
      setEmail(value);
    }
  };

  return (
    <ForgotPasswordPageContainer>
      {/* 페이지 우상단에 위치하는 회원가입 버튼 */}
      <SignupButton onClick={goToSignUp} aria-label="Sign Up">
        <img src={SignUpButtonImg} alt="Sign Up" />
      </SignupButton>

      {/* 가운데 하단에 위치시킬 이메일 필드와 Go 버튼 */}
      <ForgotPasswordCenterContainer>
        <EmailContainer>
          <LogInTextField
            label="Email"
            value={email}
            onChange={handleEmailChange}
            placeholder="inspace@gmail.com"
            type="text"
          />
          <GoButton
            onClick={handleGoClick}
            disabled={!email.trim()}
            aria-label="Go"
          >
            <img src={GoButtonImg} alt="Go" />
          </GoButton>
        </EmailContainer>
      </ForgotPasswordCenterContainer>
    </ForgotPasswordPageContainer>
  );
};

export default ForgotPasswordPage;

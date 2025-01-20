// ForgotPasswordPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../context/AlertContext';
import LogInTextField from '../../components/user/LogInTextField';
import SignUpButtonImg from '../../assets/img/button/SignUpButton.png';
import GoButtonImg from '../../assets/img/button/GoButton.png';
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

  const handleGoClick = () => {
    // 실제로는 서버에 비밀번호 재설정 요청을 보내야 합니다.
    // 예시로 Alert만 표시
    showAlert(
      '입력된 이메일로 비밀번호를 전송했습니다.',
      () => navigate('/login'),
      '로그인하러 가기',
    );
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

// ForgotPasswordPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../context/AlertContext';
import LogInTextField from '../../components/user/LogInTextField';
import SignUpButtonImg from '../../assets/img/button/SignUpButton.png';
import GoButtonImg from '../../assets/img/button/GoButton.png';
import forgotPasswordPageStyles from '../../styles/user/ForgotPasswordPageStyle.js';

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

  // 영어 및 숫자만 입력받도록 제한하는 정규식
  const emailRegex = /^[A-Za-z0-9@._-]+$/;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    if (emailRegex.test(value) || value === '') {
      setEmail(value);
    }
  };

  return (
    <>
      <style>{forgotPasswordPageStyles}</style>

      <div className="forgot-password-page">
        {/* 페이지 우상단에 위치하는 회원가입 버튼 */}
        <button
          className="signup-button"
          onClick={goToSignUp}
          aria-label="Sign Up"
        >
          <img src={SignUpButtonImg} alt="Sign Up" />
        </button>

        {/* 가운데 하단에 위치시킬 이메일 필드와 Go 버튼 */}
        <div className="forgot-password-center-container">
          <div className="email-container">
            <LogInTextField
              label="Email"
              value={email}
              onChange={handleEmailChange}
              placeholder="inspace@gmail.com"
              type="text"
            />
            <button
              className="go-button"
              onClick={handleGoClick}
              aria-label="Go"
              disabled={!email.trim()}
            >
              <img src={GoButtonImg} alt="Go" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;

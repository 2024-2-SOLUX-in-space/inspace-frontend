// SignUpPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../context/AlertContext';
import TextField from '../../components/user/TextField';
import SignUpLogo from '../../assets/img/logo/signupLogo.png';
import signUpPageStyles from '../../styles/user/SignUpPageStyle.js';

function SignUpPage() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const handleJoin = () => {
    if (!nickname.trim()) {
      showAlert('닉네임을 입력해주세요.');
      return;
    }
    if (!email.trim()) {
      showAlert('이메일을 입력해주세요.');
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
    if (!confirmPwd.trim()) {
      showAlert('비밀번호를 확인해주세요.');
      return;
    }
    if (password !== confirmPwd) {
      showAlert('비밀번호가 일치하지 않습니다.');
      return;
    }
    showAlert(
      '가입되었습니다! 로그인을 진행해 주세요.',
      () => navigate('/login'),
      '로그인하러 가기',
    );
    // 실제 회원가입 로직을 추가하려면 여기에 구현
  };

  const emailRegex = /^[A-Za-z0-9@._-]+$/;
  const passwordRegex = /^[A-Za-z0-9!@#$%^&*]*$/;

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setNickname(value);
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

  const handleConfirmPwdChange = (e) => {
    const value = e.target.value;
    if (passwordRegex.test(value) || value === '') {
      setConfirmPwd(value);
    }
  };

  return (
    <>
      <style>{signUpPageStyles}</style>

      <div className="signup-container">
        {/* 왼쪽: Sign Up 로고 */}
        <div className="signup-left">
          <img src={SignUpLogo} alt="Sign Up Logo" className="signup-logo" />
        </div>

        {/* 오른쪽: 폼 영역 */}
        <div className="signup-right">
          <TextField
            label="Nickname"
            value={nickname}
            onChange={handleNicknameChange}
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
            value={confirmPwd}
            onChange={handleConfirmPwdChange}
            placeholder="다시 한 번 입력해주세요."
            maxLength={20}
          />
          <button
            className="join-now-button"
            onClick={handleJoin}
            aria-label="Join Right Now"
          >
            Join Right Now
          </button>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;

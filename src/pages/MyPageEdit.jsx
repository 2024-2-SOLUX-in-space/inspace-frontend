// MyPageEdit.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../context/AlertContext';
import { useUser } from '../context/UserContext'; // 추가
import SearchBar from '../components/SearchBar';
import TextField from '../components/TextField';
import ProfileLogo from '../assets/EditProfileLogo.png';
import {
  MyPageEditContainer,
  MyPageEditLeft,
  MyPageEditLogo,
  MyPageEditRight,
  CancelButton,
  SaveButton,
} from '../styles/MyPageEditStyle';

const MyPageEdit = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { user, setUser } = useUser(); // 전역 user 상태를 가져옴

  // 기존 user 정보로 초기값 설정
  const [nickname, setNickname] = useState(user.nickname);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [confirmPwd, setConfirmPwd] = useState('');

  // 이메일/비밀번호 유효성 검사를 위한 정규식
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

  const handleCancel = () => {
    showAlert('수정을 취소하시겠습니까?', () => navigate('/mypage'), '확인');
  };

  const handleSave = () => {
    // 비밀번호 길이 체크 예시
    if (password.length < 8 || password.length > 20) {
      showAlert('비밀번호는 8자 이상 20자 이하여야 합니다.');
      return;
    }
    // 비밀번호 확인 체크
    if (password !== confirmPwd) {
      showAlert('비밀번호가 일치하지 않습니다.');
      return;
    }

    //  전역 user 상태 업데이트
    setUser({
      nickname,
      email,
      password,
    });

    showAlert(
      '프로필 수정이 완료되었습니다!',
      () => navigate('/mypage'),
      '마이페이지로 이동',
    );
  };

  // 모든 값이 입력되지 않았을 때 버튼 비활성화
  const isSaveDisabled =
    !nickname.trim() || !email.trim() || !password.trim() || !confirmPwd.trim();

  return (
    <MyPageEditContainer>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '70px',
          backgroundColor: 'white',
          zIndex: 1000,
          borderBottom: '1px solid #eee',
          padding: '10px 0',
        }}
      >
        <SearchBar iconInside />
      </div>
      {/* 왼쪽 영역: 로고 */}
      <MyPageEditLeft>
        <MyPageEditLogo src={ProfileLogo} alt="Edit Profile Logo" />
      </MyPageEditLeft>

      {/* 오른쪽 영역: 입력 폼 */}
      <MyPageEditRight>
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
          placeholder="8~20자 사이의 비밀번호"
          maxLength={20}
        />
        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPwd}
          onChange={handleConfirmPwdChange}
          placeholder="비밀번호 확인"
          maxLength={20}
        />

        <CancelButton onClick={handleCancel} aria-label="Cancel">
          Cancel
        </CancelButton>
        <SaveButton
          onClick={handleSave}
          disabled={isSaveDisabled}
          aria-label="Save"
        >
          Save
        </SaveButton>
      </MyPageEditRight>
    </MyPageEditContainer>
  );
};

export default MyPageEdit;

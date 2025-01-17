// MyPageEdit.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../context/AlertContext';
import { useUser } from '../context/UserContext';
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
  DisabledTextField,
} from '../styles/MyPageEditStyle';

const MyPageEdit = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { user, setUser } = useUser();

  // 기존 user 정보로 초기값 설정
  const [nickname, setNickname] = useState(user.nickname);

  // 이메일/비밀번호(읽기 전용, 수정 불가)
  const [email] = useState(user.email);
  const [password] = useState(user.password);

  // 비밀번호 확인을 위한 필드(사용자 입력 가능)
  const [confirmPwd, setConfirmPwd] = useState('');

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setNickname(value);
    }
  };

  const handleConfirmPwdChange = (e) => {
    setConfirmPwd(e.target.value);
  };

  const handleCancel = () => {
    showAlert('수정을 취소하시겠습니까?', () => navigate('/mypage'), '확인');
  };

  const handleSave = () => {
    if (password && password !== confirmPwd) {
      showAlert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 닉네임만 수정
    setUser({
      ...user,
      nickname,
    });

    showAlert(
      '프로필 수정이 완료되었습니다!',
      () => navigate('/mypage'),
      '마이페이지로 이동',
    );
  };

  // 닉네임과 비밀번호 확인 모두 입력 필요
  const isSaveDisabled = !nickname.trim() || !confirmPwd.trim();

  return (
    <MyPageEditContainer>
      {/* 상단 검색바 영역 */}
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
        {/* 닉네임 (수정 가능) */}
        <TextField
          label="Nickname"
          value={nickname}
          onChange={handleNicknameChange}
          placeholder="10자 이내의 닉네임"
          maxLength={10}
        />

        {/* 이메일과 비밀번호 수정 불가 */}
        <DisabledTextField>
          {/* 이메일 (disabled) */}
          <TextField
            label="Email"
            value={email}
            placeholder="inspace@gmail.com"
            maxLength={50}
            disabled
          />

          {/* 비밀번호 (disabled) */}
          <TextField
            label="Password"
            type="password"
            value={password}
            placeholder="현재 비밀번호(수정 불가)"
            maxLength={20}
            disabled
          />
        </DisabledTextField>

        {/* 비밀번호 확인 (입력 가능) */}
        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPwd}
          onChange={handleConfirmPwdChange}
          placeholder="비밀번호 확인"
          maxLength={20}
        />

        {/* 취소, 저장버튼 */}
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

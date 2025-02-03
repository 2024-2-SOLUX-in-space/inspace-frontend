// EditMyPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../context/AlertContext';
import { useUser } from '../../context/UserContext';
import Header from '../../components/Header';
import TextField from '../../components/user/TextField';
import ProfileLogo from '../../assets/img/logo/EditProfileLogo.png';
import api from '../../api/api.js';
import {
  MyPageEditContainer,
  MyPageEditLeft,
  MyPageEditLogo,
  MyPageEditRight,
  CancelButton,
  SaveButton,
  DisabledTextField,
} from '../../styles/user/MyPageEditStyle';

const EditMyPage = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { user, setUser } = useUser();

  // UserContext에서 가져온 초기값
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const passwordRegex = /^[A-Za-z0-9!@#$%^&*]*$/;

  // 새로고침 시 사용자 정보 가져오기
  useEffect(() => {
    if (!user.name || !user.email) {
      getMyInfo();
    }
  }, []);

  const getMyInfo = async () => {
    try {
      const res = await api.get('/api/user-info');
      if (res.data.success) {
        const { name: newName, email: newEmail } = res.data.data;

        setUser((prev) => ({
          ...prev,
          name: newName,
          email: newEmail,
        }));
        setName(newName);
        setEmail(newEmail);
      } else {
        showAlert('회원 정보 조회에 실패했습니다.');
      }
    } catch (error) {
      console.error('error: ', error);
      showAlert('회원 정보 조회에 실패했습니다.');
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setName(value);
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

  const handleCancel = () => {
    showAlert('수정을 취소하시겠습니까?', () => navigate('/mypage'), '확인');
  };

  const handleSave = async () => {
    if (!name.trim()) {
      showAlert('닉네임을 입력해주세요.');
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
      showAlert('비밀번호 확인란을 입력해주세요.');
      return;
    }
    if (password !== passwordConfirmation) {
      showAlert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const data = {
        name,
        email,
        password,
        passwordConfirmation,
      };

      const response = await api.patch('/api/user-info', data);

      if (response.data.success) {
        setUser((prev) => ({
          ...prev,
          name,
        }));

        showAlert(
          '프로필 수정이 완료되었습니다!',
          () => navigate('/mypage'),
          '마이페이지로 이동',
        );
      } else {
        showAlert('프로필 수정에 실패하였습니다.');
      }
    } catch (error) {
      console.error('error: ', error);
      showAlert('프로필 수정에 실패하였습니다.');
    }
  };

  const isSaveDisabled =
    !name.trim() || !password.trim() || !passwordConfirmation.trim();

  return (
    <MyPageEditContainer>
      {/* 상단 헤더 영역 */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '50px',
          backgroundColor: 'white',
          zIndex: 1000,
          borderBottom: '1px solid #eee',
          padding: '10px 0',
        }}
      >
        <Header iconInside />
      </div>

      {/* 왼쪽 영역: 로고 */}
      <MyPageEditLeft>
        <MyPageEditLogo src={ProfileLogo} alt="Edit Profile Logo" />
      </MyPageEditLeft>

      {/* 오른쪽 영역: 입력 폼 */}
      <MyPageEditRight>
        {/* 닉네임 */}
        <TextField
          label="Nickname"
          value={name}
          onChange={handleNameChange}
          placeholder="10자 이내의 닉네임"
          maxLength={10}
        />

        {/* 이메일 (읽기 전용) */}
        <DisabledTextField>
          <TextField label="Email" value={email} disabled />
        </DisabledTextField>

        {/* 비밀번호 */}
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="8~20자 사이의 비밀번호"
          maxLength={20}
        />

        {/* 비밀번호 확인 */}
        <TextField
          label="Confirm Password"
          type="password"
          value={passwordConfirmation}
          onChange={handlePasswordConfirmationChange}
          placeholder="비밀번호 확인"
          maxLength={20}
        />

        {/* 취소, 저장 버튼 */}
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

export default EditMyPage;

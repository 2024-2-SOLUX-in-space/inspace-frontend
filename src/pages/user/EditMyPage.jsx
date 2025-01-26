// EditMyPage.jsx
import React, { useState } from 'react';
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

  // 이메일 제외한 정보는 수정 가능
  const [name, setName] = useState(user.name);
  const [email] = useState(user.email); // 읽기 전용
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const emailRegex = /^[A-Za-z0-9@._-]+$/;
  const passwordRegex = /^[A-Za-z0-9!@#$%^&*]*$/;

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

  // 저장 버튼 (서버에 PATCH 요청)
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
      showAlert('비밀번호를 확인해주세요.');
      return;
    }
    if (password !== passwordConfirmation) {
      showAlert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 서버에 PATCH 요청
    // setUser({
    //   ...user,
    //   name,
    // });

    try {
      const data = {
        name: name,
        email: email,
        password: password,
        passwordConfirmation: passwordConfirmation,
      };
      console.log('전송할 data:', data);

      const response = await api.patch('/api/user-info', data);

      if (response.data.success) {
        setUser({
          ...user,
          name,
          password,
          passwordConfirmation,
        });
        showAlert(
          '프로필 수정이 완료되었습니다!',
          () => navigate('/mypage'),
          '마이페이지로 이동',
        );
      } else {
        showAlert('프로필 수정에 실패하였습니다.');
      }
    } catch (error) {
      console.log('error: ', error);
      showAlert('프로필 수정에 실패하였습니다.');
    }
  };

  // 이름, 비밀번호, 비밀번호 확인 모두 입력해야 저장 가능
  const isSaveDisabled =
    !name.trim() || !password.trim() || !passwordConfirmation.trim();

  return (
    <MyPageEditContainer>
      {/* 상단 검색바 영역 */}
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
        {/* 닉네임 (수정 가능) */}
        <TextField
          label="Nickname"
          value={name}
          onChange={handleNameChange}
          placeholder="10자 이내의 닉네임"
          maxLength={10}
        />

        {/* 이메일 수정 불가 */}
        <DisabledTextField>
          <TextField
            label="Email"
            value={email}
            placeholder="inspace@gmail.com"
            maxLength={50}
            disabled
          />
        </DisabledTextField>

        {/* 비밀번호 (수정 가능) */}
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="8~20자 사이의 비밀번호를 입력해주세요."
          maxLength={20}
        />

        {/* 비밀번호 확인 (수정 가능) */}
        <TextField
          label="Confirm Password"
          type="password"
          value={passwordConfirmation}
          onChange={handlePasswordConfirmationChange}
          placeholder="다시 한 번 입력해주세요."
          maxLength={20}
          visibilityButtonClass="my-textfield-icon"
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

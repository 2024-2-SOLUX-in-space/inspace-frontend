// MyPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../context/AlertContext';
import TextField from '../components/TextField';
import ProfileLogo from '../assets/ProfileLogo.png';
import {
  MyPageContainer,
  LogoutButton,
  MyPageLeft,
  MyPageLogo,
  MyPageRight,
  EditButton,
} from '../styles/MyPageStyle';

const MyPage = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const handleEdit = () => {
    navigate('/mypage-edit');
  };

  const handleLogout = () => {
    showAlert('로그아웃 하시겠습니까?', () => navigate('/'), '확인');
  };

  return (
    <MyPageContainer>
      {/* 로그아웃 버튼 */}
      <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>

      {/* 왼쪽 영역: 로고 */}
      <MyPageLeft>
        <MyPageLogo src={ProfileLogo} alt="Profile Logo" />
      </MyPageLeft>

      {/* 오른쪽 영역: 입력 폼 */}
      <MyPageRight>
        <TextField
          label="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </MyPageRight>

      {/* 정보 수정 버튼 */}
      <EditButton onClick={handleEdit}>Edit</EditButton>
    </MyPageContainer>
  );
};

export default MyPage;

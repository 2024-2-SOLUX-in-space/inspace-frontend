// MyPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../context/AlertContext';
import { useUser } from '../../context/UserContext'; // 추가
import Header from '../../components/Header';
import TextField from '../../components/user/TextField';
import ProfileLogo from '../../assets/img/logo/ProfileLogo.png';
import {
  MyPageContainer,
  LogoutButton,
  MyPageLeft,
  MyPageLogo,
  MyPageRight,
  EditButton,
} from '../../styles/user/MyPageStyle';

const MyPage = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { user } = useUser(); //  전역 user 상태에서 nickname, email, password를 꺼냄

  const handleEdit = () => {
    navigate('/mypage-edit');
  };

  const handleLogout = () => {
    showAlert('로그아웃 하시겠습니까?', () => navigate('/'), '확인');
  };

  // password를 UI에서만 마스킹
  const maskedPassword =
    user.password && user.password.length > 0
      ? '⦁'.repeat(user.password.length)
      : '';

  return (
    <MyPageContainer>
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
      {/* 로그아웃 버튼 */}
      <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>

      {/* 왼쪽 영역: 로고 */}
      <MyPageLeft>
        <MyPageLogo src={ProfileLogo} alt="Profile Logo" />
      </MyPageLeft>

      {/* 오른쪽 영역: 입력 폼 (읽기 전용) */}
      <MyPageRight>
        <TextField
          label="Nickname"
          value={user.nickname}
          onChange={() => {}}
          disabled
        />
        <TextField
          label="Email"
          value={user.email}
          onChange={() => {}}
          disabled
        />
        <TextField
          label="Password"
          value={maskedPassword}
          onChange={() => {}}
          disabled
        />
      </MyPageRight>

      {/* 정보 수정 버튼 */}
      <EditButton onClick={handleEdit}>Edit</EditButton>
    </MyPageContainer>
  );
};

export default MyPage;

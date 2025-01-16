// MyPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../context/AlertContext';
import SearchBar from '../components/SearchBar';
import TextField from '../components/TextField';
import ProfileLogo from '../assets/ProfileLogo.png';
import myPageStyles from '../styles/MyPageStyle.js';

const MyPage = () => {
  const [nickname, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const handleEdit = () => {
    navigate('/mypage-edit');
  };

  const handleLogout = () => {
    showAlert('로그아웃 하시겠습니까?', () => navigate('/'), '확인');
  };

  return (
    <>
      <style>{myPageStyles}</style>
      <div className="mypage-container">
        {/* 로그아웃 버튼 - 화면 왼쪽 상단 */}
        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>

        {/* 왼쪽 영역 */}
        <div className="mypage-left">
          <img src={ProfileLogo} alt="Profile Logo" className="mypage-logo" />
        </div>

        {/* 오른쪽 영역 */}
        <div className="mypage-right">
          <div className="input-box">
            <TextField
              label="Nickname"
              value={nickname}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className="edit-button" onClick={handleEdit}>
            Edit
          </button>
        </div>
      </div>
    </>
  );
};

export default MyPage;

// MyPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../context/AlertContext';
import TextField from '../components/TextField';
import ProfileLogo from '../assets/ProfileLogo.png';
import '../styles/MyPage.css';

const MyPage = () => {
  const [nickname, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const handleEdit = () => {
    navigate('/mypageedit');
  };

  const handleLogout = () => {
    const confirmed = showAlert('로그아웃 하시겠습니까?');
    if (confirmed) {
      // 로그아웃 처리 로직이 있다면 추가
      // 예: 쿠키/로컬스토리지/리덕스 상태 제거 등

      // Landing page로 이동
      navigate('/landingpage');
    }
  };

  return (
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
  );
};

export default MyPage;

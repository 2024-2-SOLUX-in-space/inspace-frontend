// MyPage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../context/AlertContext';
import { useUser } from '../../context/UserContext';
import Header from '../../components/Header';
import TextField from '../../components/user/TextField';
import ProfileLogo from '../../assets/img/logo/ProfileLogo.png';
import api from '../../api/api.js';
import { useDispatch } from 'react-redux';
import { resetSpaces } from '../../redux/actions/spaceActions';
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
  const { user, setUser } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('user: ', user);
    const getMyInfo = async () => {
      try {
        const res = await api.get('/api/user-info');

        if (res.data.success) {
          const { email, name } = res.data.data;
          // user.name = name;
          // user.email = email;

          setUser((prev) => ({
            ...prev,
            name,
            email,
          }));
        } else {
          showAlert('회원 정보 조회에 실패하였습니다.');
        }
      } catch (error) {
        console.log('error: ', error);
        showAlert('회원 정보 조회에 실패하였습니다.');
      }
    };
    getMyInfo();
  }, []);

  const handleLogout = () => {
    showAlert('로그아웃 하시겠습니까?', async () => {
      try {
        const response = await api.post('/api/auth/logout');
        if (response.data.success) {
          showAlert('성공적으로 로그아웃 되었습니다.');
          localStorage.clear();
          dispatch(resetSpaces());
          setUser({ name: '', email: '' });
          navigate('/login');
        }
      } catch (error) {
        showAlert('로그아웃에 실패했습니다. 다시 시도해주세요.', () =>
          navigate('/mypage'),
        );
      }
    });
  };

  const handleEdit = () => {
    navigate('/mypage-edit');
  };

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
          value={user.name}
          onChange={() => {}}
          disabled
        />
        <TextField
          label="Email"
          value={user.email}
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

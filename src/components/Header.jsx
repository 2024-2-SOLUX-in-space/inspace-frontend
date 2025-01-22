import React, { useState } from 'react';
import styled from 'styled-components';
import { FiSearch, FiBell, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Notification from './alert/Notification';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1%;
  background-color: #fff;
  height: 5vh;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2000;
`;

const Logo = styled.img`
  height: 35px;
  padding-left: 5px;
`;

const SearchInputWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  margin: 0 1%;
  border-radius: 20px;
  padding: 0 10px;
  background-color: #f5f5f5;
  height: 100%;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 0 10px;
  font-size: 16px;
  background-color: #f5f5f5;
  height: 100%;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 15px;
  margin: 0 10px;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 20%;
  transition: background-color 0.3s;
  outline: none;
  background-color: ${(props) =>
    props.isSelected ? '#ececec' : 'transparent'};

  &:hover {
    background-color: #ececec;
  }

  &:focus {
    outline: none;
  }

  svg {
    width: 4vh;
    height: 4vh;
  }
`;

const IconButtonWrapper = styled.div`
  position: relative;
`;

const NotificationBadge = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 8px;
  height: 8px;
  background-color: #ff4b4b;
  border-radius: 50%;
  z-index: 1;
`;

const NotificationsWrapper = styled.div`
  position: absolute;
  top: 75px;
  right: 70px;
  z-index: 100;
`;

const NotificationsContainer = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  min-width: 300px;

  @media (max-width: 500px) {
    min-width: 250px;
  }
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
`;

const HeaderTitle = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const HeaderDivider = styled.span`
  color: #ddd;
  margin: 0 8px;
`;

const MarkAsReadButton = styled.button`
  border: none;
  background: none;
  color: #666;
  font-size: 16px;
  cursor: pointer;
  padding: 0;
  outline: none;

  &:hover {
    color: #333;
  }

  &:focus {
    outline: none;
  }
`;

const EmptyNotification = styled.div`
  text-align: center;
  color: #666;
  padding: 20px 0;
  font-size: 14px;
`;

const NotificationsContent = styled.div`
  max-height: 200px;
  overflow-y: auto;

  /* 스크롤바 전체 너비 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  /* 스크롤바 트랙(배경) */
  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 5px;
  }

  /* 스크롤바 thumb(움직이는 부분) */
  &::-webkit-scrollbar-thumb {
    background: #e0e0e0;
    border-radius: 50px;
  }

  /* 스크롤바 thumb 호버 시 */
  &::-webkit-scrollbar-thumb:hover {
    background: #bdbdbd;
  }
`;

const Header = () => {
  const [searchText, setSearchText] = useState('');
  const [isBellFilled, setIsBellFilled] = useState(false);
  const [isUserFilled, setIsUserFilled] = useState(false);
  const [isSearchFilled, setIsSearchFilled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  //가상 데이터 예시
  const [notifications, setNotifications] = useState([
    { username: 'space', action: '나를 팔로우합니다' },
    { username: '웹프핑', action: '나를 팔로잉합니다' },
    { username: '차은우', action: '나를 팔로우합니다' },
    { username: '에스파', action: '나를 팔로우합니다' },
    { username: 'nct', action: '나를 팔로우합니다' },
    { username: '아이유', action: '나를 팔로우합니다' },
    { username: '블랙핑크', action: '나를 팔로우합니다' },
    { username: '뉴진스', action: '나를 팔로우합니다' },
    { username: '트와이스', action: '나를 팔로우합니다' },
  ]);

  const handleSearch = () => {
    setIsSearchFilled(!isSearchFilled);
    if (searchText.trim()) {
      navigate('/search');
    }
  };

  //마이페이지 이동 로직
  const handleUserClick = () => {
    //etIsUserFilled(!isUserFilled);
    navigate('/mypage');
  };

  const handleMarkAsRead = () => {
    setNotifications([]);
  };

  const handleBellClick = () => {
    setIsBellFilled(!isBellFilled);
    setShowNotifications(!showNotifications);
  };

  return (
    <HeaderContainer>
      <Logo
        src="/public/Logo.png"
        alt="Logo"
        onClick={() => navigate('/home')}
        style={{ cursor: 'pointer' }}
      />
      <SearchInputWrapper>
        <FiSearch size={24} style={{ marginRight: '10px' }} />
        <SearchInput
          type="text"
          placeholder="검색어를 입력하세요..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
      </SearchInputWrapper>
      <IconContainer>
        <IconButtonWrapper>
          <IconButton onClick={handleBellClick} isSelected={isBellFilled}>
            <FiBell size={32} fill={isBellFilled ? 'currentColor' : 'none'} />
          </IconButton>
          {notifications.length > 0 && <NotificationBadge />}
        </IconButtonWrapper>

        <IconButton onClick={handleUserClick} isSelected={isUserFilled}>
          <FiUser size={32} fill={isUserFilled ? 'currentColor' : 'none'} />
        </IconButton>
      </IconContainer>

      {showNotifications && (
        <NotificationsWrapper>
          <NotificationsContainer>
            <NotificationHeader>
              <HeaderTitle>알림함</HeaderTitle>
              <HeaderDivider>|</HeaderDivider>
              <MarkAsReadButton onClick={handleMarkAsRead}>
                모두 읽음으로 표시
              </MarkAsReadButton>
            </NotificationHeader>

            <NotificationsContent>
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <Notification
                    key={index}
                    username={notification.username}
                    action={notification.action}
                  />
                ))
              ) : (
                <EmptyNotification>
                  현재 최신 알림이 없습니다.
                </EmptyNotification>
              )}
            </NotificationsContent>
          </NotificationsContainer>
        </NotificationsWrapper>
      )}
    </HeaderContainer>
  );
};

export default Header;
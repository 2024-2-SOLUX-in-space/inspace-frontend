import React, { useState } from 'react';
import styled from 'styled-components';
import { FiSearch, FiBell, FiUser } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
`;

const Logo = styled.img`
  height: 40px;
  padding-left: 10px;
`;

const SearchInputWrapper = styled.div`
  flex: 1.2;
  display: flex;
  align-items: center;
  margin: 0 30px;
  border-radius: 20px;
  padding: 10px 10px;
  background-color: #f5f5f5;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 10px;
  font-size: 1.2rem;
  background-color: #f5f5f5;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-right: 30px;
`;

const IconButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 20%;
  transition: background-color 0.3s;
  outline: none;
  background-color: ${props => props.isSelected ? '#ececec' : 'transparent'};

  &:hover {
    background-color: #ececec;
  }

  &:focus {
    outline: none;
  }
`;

const IconButtonWrapper = styled.div`
  position: relative;
`;

const NotificationBadge = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 10px;
  height: 10px;
  background-color: #ff4b4b;
  border-radius: 50%;
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
  min-width: 320px;

  @media (max-width: 768px) {
    min-width: 280px;
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
  max-height: 250px;
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

const SearchBar = () => {
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
    setIsUserFilled(!isUserFilled);
    //navigate('/mypage');
  };

  const handleMarkAsRead = () => {
    setNotifications([]);
  };

  const handleBellClick = () => {
    setIsBellFilled(!isBellFilled);
    setShowNotifications(!showNotifications);
  };

  return (
    <SearchBarContainer>
      <Logo src="/src/img/Logo.png" alt="Logo" />
      <SearchInputWrapper>
        <IconButton 
          onClick={handleSearch} 
          isSelected={isSearchFilled}
        >
          <FiSearch 
            size={24} 
            style={{ marginRight: '10px' }} 
            fill={isSearchFilled ? 'currentColor' : 'none'} 
          />
        </IconButton>
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
          <IconButton 
            onClick={handleBellClick}
            isSelected={isBellFilled}
          >
            <FiBell 
              size={32} 
              fill={isBellFilled ? 'currentColor' : 'none'} 
            />
          </IconButton>
          {notifications.length > 0 && <NotificationBadge />}
        </IconButtonWrapper>
        
        <IconButton 
          onClick={handleUserClick}
          isSelected={isUserFilled}
        >
          <FiUser 
            size={32} 
            fill={isUserFilled ? 'currentColor' : 'none'} 
          />
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
    </SearchBarContainer>
  );
};

export default SearchBar;
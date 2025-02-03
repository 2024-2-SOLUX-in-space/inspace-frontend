import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiSearch, FiBell, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Notification from './alert/Notification';
import api from '../api/api.js';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 1%;
  background-color: #fff;
  height: 7.5vh;
  z-index: 2000;
  position: fixed;
  top: 0;
  width: 100%;
  border-bottom: 1px solid #ececec;
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
  padding: 5px;
  border-radius: 20%;
  transition: background-color 0.3s;
  outline: none;
  background-color: ${(props) =>
    props.isSelected ? '#ececec' : 'transparent'};
  cursor: pointer;
  &:hover {
    background-color: #ececec;
  }

  &:focus {
    outline: none;
  }

  svg {
    width: 28px;
    height: 28px;
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

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #e0e0e0;
    border-radius: 50px;
  }

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
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

  // 검색 기능 
  const handleSearch = () => {
    if (searchText.trim()) {
      navigate('/search', { state: { query: searchText.trim() } }); // 검색어 전달
    }
  };

  // 마이페이지 이동 로직
  const handleUserClick = () => {
    navigate('/mypage');
  };

  // 초기 알림 데이터 불러오기
  const fetchNotifications = async () => {
    try {
      const response = await api.get('/api/notifications/unread');
      const unreadNotifications = response.data.slice(0, 10);
  
      // 초기 알림 데이터를 SSE 알림과 병합
      setNotifications((prev) => [...unreadNotifications, ...prev]);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };
  
  useEffect(() => {
    let isMounted = true;
    let reader;
  
    const connectSSE = async () => {
      try {
        const response = await fetch(
          `http://3.35.10.158:8080/api/notifications/stream`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
  
        while (isMounted) {
          const { done, value } = await reader.read();
          if (done) break; 
  
          const text = decoder.decode(value, { stream: true }).trim();
  
          // `data:` 부분 추출
          if (text.includes("data:")) {
            const jsonData = text.split("data:")[1]?.trim(); 
  
            try {
              const newNotification = JSON.parse(jsonData); 
  
              // 알림 목록 업데이트
              setNotifications((prev) => {
                const updatedNotifications = [newNotification, ...prev];
                if (updatedNotifications.length > 10) {
                  updatedNotifications.pop(); 
                }
                return updatedNotifications;
              });
            } catch (e) {
              console.error("Failed to parse notification:", e);
            }
          } else {
          }
        }
      } catch (error) {
        console.error("SSE fetch error:", error);
        setTimeout(connectSSE, 5000); 
      }
    };
  
    fetchNotifications(); // 초기 알림 데이터
    connectSSE(); // SSE 연결 실행
  
    return () => {
      isMounted = false;
  
      if (reader) {
        reader.cancel().catch((err) => console.error("Error canceling reader:", err));
      }
    };
  }, []);

  // 알림 아이콘 클릭
  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
    setIsBellFilled(false);
  };

  // 모두 읽음 처리
  const handleMarkAsRead = async () => {
    try {
      await api.patch('/api/notifications/read-all');
      setNotifications([]);
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
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
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()} // Enter로 검색
        />
      </SearchInputWrapper>
      <IconContainer>
        <IconButtonWrapper>
          <IconButton onClick={handleBellClick} isSelected={isBellFilled}>
            <FiBell size={32} fill={isBellFilled ? 'currentColor' : 'none'} />
          </IconButton>
          {notifications?.length > 0 && <NotificationBadge />}
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
              {notifications?.length > 0 ? (
                notifications.map((notification) => {
                  return (
                    <Notification
                      key={notification.notification_id}
                      notification_id={notification.notification_id}
                      message={notification.message}
                    />
                  )
                })
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

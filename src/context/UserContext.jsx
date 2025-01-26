import React, { createContext, useContext, useState } from 'react';

// 유저 정보를 저장할 Context를 생성
const UserContext = createContext();

// Provider 컴포넌트를 만들고, children을 감싸서 user 상태를 전역으로 공급
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// 다른 컴포넌트에서 손쉽게 user 정보를 불러오고/업데이트할 수 있도록 도우미 훅 제공
export const useUser = () => useContext(UserContext);

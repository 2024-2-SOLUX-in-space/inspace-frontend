// src/context/ItemContext.js
import React, { createContext, useState, useContext } from 'react';

// Context 생성
export const ItemContext = createContext();

// Provider 컴포넌트
export const ItemProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <ItemContext.Provider value={{ selectedItem, setSelectedItem }}>
      {children}
    </ItemContext.Provider>
  );
};

// Context 사용을 위한 커스텀 훅
export const useItemContext = () => {
  return useContext(ItemContext);
};
import React, { createContext, useState, useContext } from 'react';

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // 선택된 아이템 정보 가져오기
  const getSelectedItem = (pageData) => {
    if (!selectedItem || !pageData) return null;
    for (const pageNum in pageData) {
      const foundItem = pageData[pageNum].find(item => item.id === selectedItem);
      if (foundItem) return foundItem;
    }
    return null;
  };

  return (
    <ItemContext.Provider value={{ selectedItem, setSelectedItem, getSelectedItem, items, setItems }}>
      {children}
    </ItemContext.Provider>
  );
};

// Context 사용을 위한 커스텀 훅
export const useItemContext = () => {
  return useContext(ItemContext);
};
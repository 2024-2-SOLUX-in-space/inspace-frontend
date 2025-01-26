import React, { createContext, useContext, useState } from "react";

// Context 생성
const SidebarContext = createContext();

// Provider 정의
export const SidebarProvider = ({ children }) => {
  const [isHomeOpen, setIsHomeOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isAddButtonOpen, setIsAddButtonOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isHeartOpen, setIsHeartOpen] = useState(false);

  const toggleHome = () => setIsHomeOpen((prev) => !prev);
  const toggleArchive = () => setIsArchiveOpen((prev) => !prev);
  const toggleAddButton = () => setIsAddButtonOpen((prev) => !prev);
  const toggleEdit = () => setIsEditOpen((prev) => !prev);
  const toggleHeart = () => setIsHeartOpen((prev) => !prev);

  return (
    <SidebarContext.Provider
      value={{
        isHomeOpen,
        toggleHome,
        isArchiveOpen,
        toggleArchive,
        isAddButtonOpen,
        toggleAddButton,
        isEditOpen,
        toggleEdit,
        isHeartOpen,
        toggleHeart,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

// Custom Hook
export const useSidebar = () => useContext(SidebarContext);
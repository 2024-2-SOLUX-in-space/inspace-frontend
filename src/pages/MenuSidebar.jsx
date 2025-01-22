import React, { useState } from 'react'; 
import { FiMenu, FiChevronsLeft, FiHome, FiArchive, 
    FiFilePlus, FiEdit, FiHeart } from "react-icons/fi"; 
import { MenuSidebarContainer, 
    MenuSidebarContent, 
    MenuSidebarIcon, 
    InactiveButton, 
    ActiveButton} from '../styles/sidebar/MenuSidebarStyle';
import ArchiveButton from '../components/sidebar/ArchiveButton';

import HomeButton from '../components/sidebar/HomeButton';
import AddButton from "../components/sidebar/AddButton";
import EditButton from '../components/sidebar/EditButton';
import HeartButton from '../components/sidebar/HeartButton';

    const MenuSidebar = ( { isHomeOpen, toggleHome, isArchiveOpen, toggleArchive, isAddButtonOpen, toggleAddButton, 
      isEditOpen, toggleEdit, isHeartOpen, toggleHeart }) => {
        const [isOpen, setIsOpen] = useState(true); // 사이드바 열림/닫힘 상태 관리
        const [activeIcon, setActiveIcon] = useState(null); // 활성화된 아이콘 상태 관리

        const toggleSidebar = () => {
          setIsOpen(!isOpen); 
        };
      
        // 아이콘 클릭 시 실행되는 함수 
        const handleIconClick = (iconName) => {
          if (iconName === "archive") {
            toggleArchive();
          }
          if (iconName === "home") {
            toggleHome();
          }
          if (iconName === "filePlus") {
            toggleAddButton();
          }
          if (iconName === "edit") {
            toggleEdit();
          }
          if (iconName === "heart") {
            toggleHeart();
          }
          setActiveIcon(iconName); // 아이콘의 id 값을 activeIcon 상태에 저장 
        };
      
        const menuItems = [
          { icon: <FiHome />, id: "home", tooltip: "홈" },
          { icon: <FiArchive />, id: "archive", tooltip: "공간 목록" },
          { icon: <FiFilePlus />, id: "filePlus", tooltip: "공간 추가" },
          { icon: <FiEdit />, id: "edit", tooltip: "공간 편집" },
          { icon: <FiHeart />, id: "heart", tooltip: "팔로워/팔로잉" },
        ];
      
        return (
            <>
              <ActiveButton isOpen={isOpen} onClick={toggleSidebar}>
                <FiMenu />
              </ActiveButton>
          
              <MenuSidebarContainer isOpen={isOpen}>
                <div onClick={toggleSidebar}>
                  {isOpen && (
                    <InactiveButton>
                      <FiChevronsLeft />
                    </InactiveButton>
                  )}
                </div>
          
                {isOpen && (
                  <MenuSidebarContent>
                    {menuItems.map((item) => (
                      <MenuSidebarIcon
                        key={item.id}
                        className={activeIcon === item.id ? "active" : ""}
                        isActive = {activeIcon === item.id} // 활성화 상태 전달 
                        onClick={() => handleIconClick(item.id)} // 상태 관리
                      >
                        {item.icon}
                        <span className="tooltip">{item.tooltip}</span>
                      </MenuSidebarIcon>
                    ))}

                    { activeIcon === "archive" && (
                      < ArchiveButton 
                        isArchiveOpen = {isArchiveOpen}
                        toggleArchive = {toggleArchive}
                      />
                    )}

                    { activeIcon === "filePlus" && (
                      <AddButton isAddButtonOpen = {isAddButtonOpen} 
                      toggleAddButton = {toggleAddButton} />
                    )}

                    { activeIcon === "edit" && (
                      <EditButton
                        isEditOpen = {isEditOpen}
                        toggleEdit = {toggleEdit} 
                      />
                    )}  

                    { activeIcon === "heart" && (
                      <HeartButton
                        isHeartOpen = {isHeartOpen}
                        toggleHeart = {toggleHeart}
                      />
                    )}

                    { activeIcon === "home" && (
                      <HomeButton
                        isHomeOpen = {isHomeOpen}
                        toggleHome = {toggleHome}
                      />
                    )}

                  </MenuSidebarContent>
                )}
              </MenuSidebarContainer>
            </>
          );
    }
          
export default MenuSidebar; 
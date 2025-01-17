// useState 를 사용하여 열림 상태(isOpen) 관리 
import React, { useState } from 'react'; 
import { FiMenu, FiChevronsLeft, FiHome, FiArchive, 
    FiFilePlus, FiEdit, FiHeart } from "react-icons/fi"; 
import { MenuSidebarContainer, 
    MenuSidebarContent, 
    MenuSidebarIcon, 
    InactiveButton, 
    ActiveButton} from '../styles/MenuSidebarStyle';
import ArchiveButton from '../components/ArchiveButton';
import AddButton from '../components/AddButton';
import EditButton from '../components/EditButton';

    const MenuSidebar = ( { isArchiveOpen, toggleArchive, isAddButtonOpen, toggleAddButton, 
      isEditOpen, toggleEdit }) => {
        const [isOpen, setIsOpen] = useState(true); // 사이드바 열림/닫힘 상태 관리
        const [activeIcon, setActiveIcon] = useState(null); // 활성화된 아이콘 상태 관리

        // 사이드바 열림/닫힘 상태 토글 함수 
        const toggleSidebar = () => {
          setIsOpen(!isOpen); 
        };
      
        // 아이콘 클릭 시 실행되는 함수 
        const handleIconClick = (iconName) => {
          if (iconName === "archive") {
            toggleArchive();
          }
          if (iconName === "filePlus") {
            toggleAddButton();
          }
          if (iconName === "edit") {
            toggleEdit();
          }
          setActiveIcon(iconName); // 아이콘의 id 값을 activeIcon 상태에 저장 
        };
      
        // 아이콘을 배열로 저장하는 상수 
        // map 메서드 사용해 메뉴 렌더링
        const menuItems = [
          { icon: <FiHome />, id: "home", tooltip: "홈" },
          { icon: <FiArchive />, id: "archive", tooltip: "공간 목록" },
          { icon: <FiFilePlus />, id: "filePlus", tooltip: "공간 추가" },
          { icon: <FiEdit />, id: "edit", tooltip: "공간 편집" },
          { icon: <FiHeart />, id: "heart", tooltip: "팔로워/팔로잉" },
        ];
      
        return (
            <>
              {/* ActiveButton 항상 렌더링 */}
              <ActiveButton isOpen={isOpen} onClick={toggleSidebar}>
                <FiMenu />
                <span className="tooltip">메뉴바 열기</span>
              </ActiveButton>
          
              <MenuSidebarContainer isOpen={isOpen}>
                <div onClick={toggleSidebar}>
                  {isOpen && (
                    <InactiveButton>
                      <FiChevronsLeft />
                      <span className="tooltip">메뉴바 닫기</span>
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

                  </MenuSidebarContent>
                )}
              </MenuSidebarContainer>
            </>
          );
    }
          
export default MenuSidebar; 
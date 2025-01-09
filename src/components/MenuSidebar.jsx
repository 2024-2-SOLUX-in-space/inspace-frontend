// useState 를 사용하여 열림 상태(isOpen) 관리 
import React, { useState } from 'react'; 
import { FiMenu, FiChevronsLeft, FiHome, FiArchive, 
    FiFilePlus, FiEdit, FiHeart } from "react-icons/fi"; 
import { MenuSidebarContainer, 
    MenuSidebarContent, 
    MenuSidebarIcon, 
    InactiveButton, 
    ActiveButton} from '../styles/MenuSidebarStyle';

    const MenuSidebar = () => {
        const [isOpen, setIsOpen] = useState(true); // 사이드바 열림/닫힘 상태 관리
        const [activeIcon, setActiveIcon] = useState(null); // 활성화된 아이콘 상태 관리
      
        // 사이드바 열림/닫힘 상태 토글 함수 
        const toggleSidebar = () => {
          setIsOpen(!isOpen); 
        };
      
        // 아이콘 클릭 시 실행되는 함수 
        const handleIconClick = (iconName) => {
          setActiveIcon(iconName); // 아이콘의 id 값을 activeIcon 상태에 저장 
          console.log(`${iconName} clicked`); // 어떤 아이콘이 클릭되었는지 알 수 있다 
          // ***화면 전환 또는 알림창 추가*** 
        };
      
        // 아이콘을 배열로 저장하는 상수 
        // map 메서드 사용해 메뉴 렌더링
        const menuItems = [
          { icon: <FiHome />, id: "home", tooltip: "홈으로 이동" },
          { icon: <FiArchive />, id: "archive", tooltip: "공간 목록 보기" },
          { icon: <FiFilePlus />, id: "filePlus", tooltip: "공간 추가하기" },
          { icon: <FiEdit />, id: "edit", tooltip: "공간 편집하기" },
          { icon: <FiHeart />, id: "heart", tooltip: "팔로워/팔로잉" },
        ];
      
        return (
            <>
              {/* ActiveButton 항상 렌더링 */}
              <ActiveButton isOpen={isOpen} onClick={toggleSidebar}>
                <FiMenu />
                <span className="tooltip">메뉴바 열기</span>
              </ActiveButton>
          
              {/* 사이드바 */}
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
                        onClick={() => handleIconClick(item.id)}
                      >
                        {item.icon}
                        <span className="tooltip">{item.tooltip}</span>
                      </MenuSidebarIcon>
                    ))}
                  </MenuSidebarContent>
                )}
              </MenuSidebarContainer>
            </>
          );
    }
          
export default MenuSidebar; 
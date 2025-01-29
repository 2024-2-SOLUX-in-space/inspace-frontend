import React, { useState, useContext } from 'react'; 
import { FiMenu, FiChevronsLeft, FiHome, FiArchive, 
    FiFilePlus, FiEdit, FiHeart } from "react-icons/fi"; 
import { MenuSidebarContainer, 
    MenuSidebarContent, 
    MenuSidebarIcon, 
    InactiveButton, 
    ActiveButton } from '../styles/sidebar/MenuSidebarStyle';
import ArchiveButton from '../components/sidebar/ArchiveButton';
import HomeButton from '../components/sidebar/HomeButton';
import AddButton from "../components/sidebar/AddButton";
import EditButton from '../components/sidebar/EditButton';
import HeartButton from '../components/sidebar/HeartButton';
import { SpaceContext } from '../context/SpaceContext';

const MenuSidebar = ({
  isArchiveOpen, toggleArchive, 
  isAddButtonOpen, toggleAddButton, 
  isEditOpen, toggleEdit, 
  isHeartOpen, toggleHeart 
}) => {
    const [isOpen, setIsOpen] = useState(true);
    const [activeIcon, setActiveIcon] = useState("home");
    const { spaces, resetToPrimarySpace } = useContext(SpaceContext);

    const toggleSidebar = () => {
      setIsOpen(!isOpen); 
    };
  
    const handleIconClick = (iconName) => {
      if (iconName === "home") {
        resetToPrimarySpace();
      }
      if (iconName === "archive") {
        toggleArchive();
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
      setActiveIcon(iconName);
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
                    isActive={activeIcon === item.id}
                    onClick={() => handleIconClick(item.id)}
                  >
                    {item.icon}
                    <span className="tooltip">{item.tooltip}</span>
                  </MenuSidebarIcon>
                ))}
                { activeIcon === "home" && (
                  <HomeButton />
                )}

                { activeIcon === "archive" && (
                  <ArchiveButton 
                    isArchiveOpen={isArchiveOpen}
                    toggleArchive={toggleArchive}
                  />
                )}

                { activeIcon === "filePlus" && (
                  <AddButton isAddButtonOpen={isAddButtonOpen} 
                  toggleAddButton={toggleAddButton} />
                )}

                { activeIcon === "edit" && (
                  <EditButton
                    isEditOpen={isEditOpen}
                    toggleEdit={toggleEdit} 
                  />
                )}  

                { activeIcon === "heart" && (
                  <HeartButton
                    isHeartOpen={isHeartOpen}
                    toggleHeart={toggleHeart}
                  />
                )}
              </MenuSidebarContent>
            )}
          </MenuSidebarContainer>
        </>
      );
}

export default MenuSidebar; 

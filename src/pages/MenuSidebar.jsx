import React, { useState, useContext, useEffect } from 'react'; 
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
import HeartButton from '../components/sidebar/HeartButton';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveSpace } from '../redux/actions/spaceActions';

const MenuSidebar = ({
  isArchiveOpen, toggleArchive, 
  isAddButtonOpen, toggleAddButton,
  isHeartOpen, toggleHeart 
}) => {
    const [isOpen, setIsOpen] = useState(true);
    const [activeIcon, setActiveIcon] = useState("home");
    const dispatch = useDispatch();
    // ✅ useSelector를 최상단에서 호출 (이벤트 핸들러 내부에서 호출 X)
    const spaces = useSelector(state => state.space.spaces);
    const activeSpace = useSelector(state => state.space.activeSpace);
    const currentUserId = useSelector(state => state.auth.currentUser?.id); // ✅ 최상단에서 호출

    useEffect(() => {
      if (spaces.length === 0) {
        dispatch(setActiveSpace(null));
      }
    }, [spaces, dispatch]);

    useEffect(() => {
      // 컴포넌트가 처음 렌더링될 때 home 아이콘의 기능 실행
      if (activeIcon === "home") {
        const savedPrimarySpace = currentUserId
          ? localStorage.getItem(`primarySpace_${currentUserId}`)
          : null;
        const primarySpace = savedPrimarySpace
          ? JSON.parse(savedPrimarySpace)
          : spaces.find((space) => space.isPrimary);

        if (primarySpace) {
          dispatch(setActiveSpace(primarySpace));
          console.log("🏠 홈 공간 설정됨:", primarySpace);
        } else {
          console.warn("⚠ 공간 없음: activeSpace를 null로 설정");
          dispatch(setActiveSpace(null));
        }
      }
    }, [activeIcon, currentUserId, spaces, dispatch]);

    const toggleSidebar = () => {
      setIsOpen(!isOpen); 
    };
  
    const handleIconClick = (iconName) => {
      if (activeIcon === iconName) {
        setActiveIcon(null);
      } else {
        setActiveIcon(iconName); // 상태 업데이트를 먼저 수행
        if (iconName === "home") {
          const savedPrimarySpace = currentUserId
            ? localStorage.getItem(`primarySpace_${currentUserId}`)
            : null;
          const primarySpace = savedPrimarySpace
            ? JSON.parse(savedPrimarySpace)
            : spaces.find((space) => space.isPrimary);

          if (primarySpace) {
            dispatch(setActiveSpace(primarySpace));
            console.log("🏠 홈 공간 설정됨:", primarySpace);
          } else {
            console.warn("⚠ 공간 없음: activeSpace를 null로 설정");
            dispatch(setActiveSpace(null));
          }
        }
        if (iconName === "archive") {
          toggleArchive();
        }
        if (iconName === "filePlus") {
          toggleAddButton();
        }
        if (iconName === "heart") {
          toggleHeart();
        }
      }
    };
  
    const menuItems = [
      { icon: <FiHome />, id: "home", tooltip: "홈" },
      { icon: <FiArchive />, id: "archive", tooltip: "공간 목록" },
      { icon: <FiFilePlus />, id: "filePlus", tooltip: "공간 추가" },
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

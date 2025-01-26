import styled from 'styled-components';

// 사이드바 컨테이너 (이동)
export const MenuSidebarContainer = styled.div`
  position: fixed;
  top: 7.5vh;
  left: ${({ isOpen }) => (isOpen ? '0' : '-250px')};
  width: 75px;
  height: 100%;
  background-color: white;
  transition: left 0.3s ease-in-out;
  border-right: 1px solid #ececec;
  z-index: 1000; /* 사이드바가 토글 버튼 위에 배치 */
`;

// 아이콘 전체 박스 (토글 버튼 제외)
export const MenuSidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 15px;
  margin-top: 7vh;
`;

// 개별 아이콘
export const MenuSidebarIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 30px;
  color: black;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 5px;

  background-color: ${({ isActive }) => (isActive ? '#ececec' : 'transparent')};

  &:hover {
    background-color: #ececec;
  }

  .tooltip {
    position: absolute;
    top: 50%;
    left: 170%;
    transform: translateY(-50%);
    background-color: white;
    color: black;
    padding: 5px 10px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    font-size: 16px;
    text-align: center;
    white-space: nowrap;
    z-index: 2000;
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 0.2s ease-in-out,
      visibility 0.2s ease-in-out;
  }

  &:hover .tooltip {
    opacity: 1;
    visibility: visible;
  }
`;

// FiMenu 버튼 (ActiveButton)
export const ActiveButton = styled.div`
  position: fixed;
  top: 0;
  left: 16px;
  margin-top: 8.5vh;
  color: black;
  font-size: 30px;
  cursor: pointer;
  z-index: 20; /* 사이드바보다 아래에 위치 */

  display: flex;
  align-items: center;
  justify-content: center;

  width: 45px;
  height: 45px;
  border-radius: 5px;

  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #ececec;
  }
`;

// FiChevronsLeft 버튼 (InactiveButton)
export const InactiveButton = styled.div`
  position: fixed;
  top: 0;
  left: 16px;
  margin-top: 8.5vh;
  font-size: 30px;
  color: black;
  cursor: pointer;
  z-index: 1100;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 45px;
  height: 45px;
  border-radius: 5px;

  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #ececec;
  }
`;

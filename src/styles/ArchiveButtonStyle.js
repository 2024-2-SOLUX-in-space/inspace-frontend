import styled from 'styled-components';

/* 공간 목록 창 */
export const ArchiveList = styled.div`
  position: fixed;
  top: 20%;
  left: 20%;
  width: 60%;
  height: 60%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 2000;
  color: black;
`;

export const ClickedArchive = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 5px;

  background-color: ${({ isActive }) => 
    isActive ? "#ECECEC" : "transparent"};
  transition: background-color 0.2s ease-in-out;

  position: absolute;
  top: 230px;
  left: 15px;
  z-index: -1000; 
`;
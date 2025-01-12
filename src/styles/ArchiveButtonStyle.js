import styled from 'styled-components';

/* 공간 목록 창 */
export const ArchiveList = styled.div`
  position: fixed;
  top: 20%;
  left: 7%;
  width: 250px;
  height: 300px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 900;
  color: black;
  padding: 10px;
`;

/* 클릭 시 회색 배경 */
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

/* 목록 속 개별 공간 */
export const ListBox = styled.div `
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 1px;
  margin: 0px;
  cursor: pointer;
  border-bottom: 1px solid black;
  background-color: ${ ({isSelected}) => ( isSelected ? "#ECECEC" : "white" ) };

  &:hover {
    background-color: #ECECEC;
  }
`;
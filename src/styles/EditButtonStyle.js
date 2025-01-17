import styled from 'styled-components';

export const EditList =styled.div`
  position: fixed;
  top: 40%;
  left: 7%;
  width: 260px;
  height: 300px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 900;
  color: black;
  padding: 8px;

  /* 스크롤 */
  max-height: ${ ({isScrollable}) => (isScrollable ? "300px" : "auto")}; 
  overflow-y: ${ ({isScrollable }) => (isScrollable ? "auto" : "hidden")}; 
`;

export const ClickedEdit = styled.div`
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
  top: 370px; 
  left: 15px; 
  z-index: -1000; 
`;

export const ListBox = styled.div `
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 3px 15px 1px;
  margin: 0px;
  cursor: pointer;
  border-bottom: 1px solid #ECECEC;
  background-color: ${ ({isSelected}) => ( isSelected ? "#ECECEC" : "white" ) };

  &:hover {
    background-color: #ECECEC;
  }
`;

export const TitleContainer = styled.span`
  flex-grow: 1; 
  text-align: left;
  margin: 0 10px; 
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; 
  font-size: 15px;
`;

export const PublicIconContainer = styled.div`
  margin-left: 10px;
  color: #555; // 아이콘 색상
  font-size: 18px; // 아이콘 크기
  display: flex;
  align-items: center;
`;

import styled from "styled-components";

export const HeartList = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 360px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 900;
  color: black;
  padding: 8px;

  max-height: 360px;
  overflow-y: ${({ isScrollable }) => (isScrollable ? "auto" : "hidden")};

  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #e0e0e0;
    border-radius: 50px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #bdbdbd;
  }
`;

export const ClickedHeart = styled.div`
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
  top: 335px;
  left: 15px;
  z-index: -1000;
`;

export const ListBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 15px 15px 10px;
  margin: 0px;
  cursor: pointer;
  border-bottom: 1px solid #ECECEC;
  background-color: ${({ isSelected }) =>
    isSelected ? "#ECECEC" : "white"};

  &:hover {
    background-color: #ececec;
  }
`;

export const TitleContainer = styled.span`
  flex-grow: 1;
  text-align: left;
  margin: 6px 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
`;

export const FollowIconContainer = styled.div`
  margin-left: 10px;
  color: #555;
  font-size: 17px;
  cursor: pointer;
  display: flex;

  width: 36px;
  height: 36px;
  background-color: black;
  color: white;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:focus {
    outline: none;
  }
`;

export const LeftIconContainer = styled.div`
  color: #555;
  font-size: 18px; 
  display: flex;
  align-items: center;
`;

export const TabContainer = styled.div`
  display: flex;
  justify-content: space-between; 
  margin-bottom: 10px; 
`;

export const TabButton = styled.button`
  flex: 1; 
  margin: 0 5px; 
  padding: 8px 12px; 
  border: none;
  border-radius: 5px;
  background-color: ${({ isActive }) => (isActive ? "#f0f0f0" : "#ffffff")};
  color: ${({ isActive }) => (isActive ? "#333" : "#999")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #eaeaea;
  }

  &:focus {
    outline: none;
  }
`;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiBook, FiBookOpen } from "react-icons/fi";

const EditList = styled.div`
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
  max-height: ${({ isScrollable }) => (isScrollable ? "300px" : "auto")};
  overflow-y: ${({ isScrollable }) => (isScrollable ? "auto" : "hidden")};

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

const ClickedEdit = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 5px;

  background-color: ${({ isActive }) => (isActive ? "#ECECEC" : "transparent")};
  transition: background-color 0.2s ease-in-out;

  position: absolute;
  top: 270px;
  left: 15px;
  z-index: -1000;
`;

const ListBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 3px 15px 1px;
  margin: 0px;
  cursor: pointer;
  border-bottom: 1px solid #ECECEC;
  background-color: ${({ isSelected }) => (isSelected ? "#ECECEC" : "white")};

  &:hover {
    background-color: #ECECEC;
  }
`;

const TitleContainer = styled.span`
  flex-grow: 1;
  text-align: left;
  margin: 0 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 15px;
`;

const PublicIconContainer = styled.div`
  margin-left: 10px;
  color: #555; 
  font-size: 18px; 
  display: flex;
  align-items: center;
`;

const EditButton = ({ isEditOpen, toggleEdit }) => {
  const [spaces, setSpaces] = useState([
    { id: 1, title: "해리포터와 마법사의 돌", isPublic: false },
    { id: 2, title: "더 퍼스트 슬램덩크", isPublic: true },
    { id: 3, title: "지킬앤하이드", isPublic: true },
    { id: 4, title: "해리포터", isPublic: false },
    { id: 5, title: "헤르미온느", isPublic: false },
    { id: 6, title: "우와앙아아아아아아아아아아ㅏ아앙", isPublic: true },
  ]);

  const [isScrollable, setIsScrollable] = useState(false);
  useEffect(() => {
    setIsScrollable(spaces.length > 5);
  }, [spaces]);

  const [selectedBox, setSelectedBox] = useState(null);

  const handleListBoxClick = (id) => {
    setSelectedBox(id);
    // 추후 연동 필요 - 개별 공간 목록 클릭 시 공간 이동
  };

  return (
    <>
      <ClickedEdit isActive={isEditOpen} onClick={toggleEdit} />

      {isEditOpen && (
        <EditList isScrollable={isScrollable}>
          {spaces.map((space) => (
            <ListBox
              key={space.id}
              isSelected={selectedBox === space.id}
              onClick={() => handleListBoxClick(space.id)}
            >
              <PublicIconContainer>
                {space.isPublic ? <FiBookOpen /> : <FiBook />}
              </PublicIconContainer>
              <TitleContainer>{space.title}</TitleContainer>
            </ListBox>
          ))}
        </EditList>
      )}
    </>
  );
};

export default EditButton;

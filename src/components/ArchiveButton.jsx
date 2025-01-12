import React, { useState } from "react";
import { ArchiveList, ClickedArchive, ListBox } from "../styles/ArchiveButtonStyle";
import FixModel from "./FixModel";

const ArchiveButton = ({ isArchiveOpen, toggleArchive }) => {
  const [spaces, setSpaces] = useState([
    { id: 1, title: "공간 1", isPinned: true }, 
    { id: 2, title: "공간 2", isPinned: false }, 
    { id: 3, title: "공간 3", isPinned: false }, 
    { id: 4, title: "공간 4", isPinned: false }, 
    { id: 5, title: "공간 5", isPinned: false }, 
  ]); 

  // 선택된 공간 (회색 배경)
  const [ selectedBox, setSelectedBox ] = useState(null); 

  // 클릭 시 공간 이동 
    const handleListBoxClick = (id) => {
      setSelectedBox(id); 
      // **추후 연동** 개별 공간 목록 클릭 시 공간 이동 
    }

    // 핀버튼 클릭 시 >> 검정색으로, 상단으로 
    const handlePinToggle = (id) => {
      setSpaces((prevSpaces) => {

        const updatedSpaces = prevSpaces.map((space) =>
          space.id === id
            ? { ...space, isPinned: true }
            : { ...space, isPinned: false }
        );
    
        const pinnedSpace = updatedSpaces.find((space) => space.id === id);
        const otherSpaces = updatedSpaces.filter((space) => space.id !== id);
    
        return [pinnedSpace, ...otherSpaces];
      });
    };    

  return (
    <>
      { /* 아이콘 배경 */ }
      <ClickedArchive isActive = {isArchiveOpen} onClick = {toggleArchive} />

      {/* 조건부 렌더링 - ArchiveList */}
      {isArchiveOpen && (
        <ArchiveList>
            {spaces.map( (space) => (
              <ListBox 
                key = {space.id}
                isSelected = {selectedBox === space.id}
                onClick = { () => handleListBoxClick (space.id) }
              >
                
                  <FixModel
                    id = {space.id}
                    isPinned = {space.isPinned}
                    onPinToggle={handlePinToggle}
                  />
                  <span> {space.title} </span>

              </ListBox>
            ))}
        </ArchiveList>
      )}
    </>
  );
};

export default ArchiveButton;
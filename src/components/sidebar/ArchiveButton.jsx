import React, { useState, useEffect } from "react";
import { ArchiveList, ClickedArchive, ListBox, TitleContainer } from "../../styles/sidebar/ArchiveButtonStyle";
import FixModal from "../sidebar/FixModal";
import TrashModal from "../sidebar/TrashModal";
import SwitchModal from "../sidebar/SwitchModal";

const ArchiveButton = ({ isArchiveOpen, toggleArchive }) => {
  const [spaces, setSpaces] = useState([
    { id: 1, title: "해리포터와 마법사의 돌", isPinned: true, isPublic: false }, 
    { id: 2, title: "더 퍼스트 슬램덩크", isPinned: false, isPublic: true }, 
    { id: 3, title: "에브리씽 에브리웨어 올 앳 원스", isPinned: false, isPublic: false }, 
    { id: 4, title: "대도시의 사랑법", isPinned: false, isPublic: true }, 
    { id: 5, title: "위키드", isPinned: false, isPublic: false },
    { id: 6, title: "지킬앤하이드", isPinned: false, isPublic: true }, 
    { id: 7, title: "시라노", isPinned: false, isPublic: false }, 
    { id: 8, title: "명성황후", isPinned: false, isPublic: false }, 
  ]); 

  const [isScrollable, setIsScrollable] = useState(false);
  useEffect( () => {
    setIsScrollable(spaces.length > 5);
  }, [spaces]);


  // 선택된 공간 (회색 배경)
  const [ selectedBox, setSelectedBox ] = useState(null); 

  // 클릭 시 공간 이동 
    const handleListBoxClick = (id) => {
      setSelectedBox(id); 
      // **추후 연동 필요** 개별 공간 목록 클릭 시 공간 이동 
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

    // trash 삭제 기능 
    const handleDeleteSpace = (id) => {
      setSpaces( (prevSpaces) => prevSpaces.filter( (space) =>
        space.id !== id));
    };

    // 공개/비공개 전환 기능
    const handleSwitchToggle = (id) => {
      setSpaces( (prevSpaces) => prevSpaces.map( (space) => 
        space.id === id ? { ...space, isPublic: !space.isPublic } : space 
        )
      );
    };

  return (
    <>
      <ClickedArchive isActive = {isArchiveOpen} onClick = {toggleArchive} />

      {isArchiveOpen && (
        <ArchiveList isScrollable = {isScrollable}>
            {spaces.map( (space) => (
              <ListBox 
                key = {space.id}
                isSelected = {selectedBox === space.id}
                onClick = { () => handleListBoxClick (space.id) }
              >
                
                  <FixModal
                    id = {space.id}
                    isPinned = {space.isPinned}
                    onPinToggle={handlePinToggle}
                  />
                  <TitleContainer> {space.title} </TitleContainer>
                  <SwitchModal
                    spaceId={space.id}
                    isPublic={space.isPublic}
                    onSwitchToggle={handleSwitchToggle}
                  />
                  <TrashModal spaceId={space.id} onDelete={handleDeleteSpace} />

              </ListBox>
            ))}
        </ArchiveList>
      )}
    </>
  );
};

export default ArchiveButton;
import React, { useState, useEffect } from "react";
import { ArchiveList, ListBox, TitleContainer } from "../../styles/sidebar/ArchiveButtonStyle";
import FixModal from "../sidebar/FixModal";
import TrashModal from "../sidebar/TrashModal";
import SwitchModal from "../sidebar/SwitchModal";
import axios from 'axios';

const ArchiveButton = ({ isArchiveOpen, toggleArchive }) => {
  const [spaces, setSpaces] = useState([]);
  const [isScrollable, setIsScrollable] = useState(false);
  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await axios.get('/api/spaces', {
          headers: {
            'Authorization': 'Bearer access_token'
          }
        });
        setSpaces(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching spaces:', error);
        setSpaces([]);
      }
    };

    fetchSpaces();
  }, []);

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
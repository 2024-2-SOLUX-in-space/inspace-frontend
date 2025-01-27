import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArchiveList, ListBox, TitleContainer } from "../../styles/sidebar/ArchiveButtonStyle";
import { FiTrash2 } from "react-icons/fi";
import Alert from "../alert/AddTrashAlert";
import FixModal from "../sidebar/FixModal";
import SwitchModal from "../sidebar/SwitchModal";
import api from '../../api/api';
import styled from "styled-components";
import Home from '../../pages/home/HomePage';
import PropTypes from 'prop-types';
import { SpaceContext } from '../../context/SpaceContext';

const ArchiveButton = ({ isArchiveOpen, toggleArchive }) => {
  const [spaces, setSpaces] = useState([]);
  const [isScrollable, setIsScrollable] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { selectedSpace, setSelectedSpace } = useContext(SpaceContext);
  const navigate = useNavigate();
  const archiveRef = useRef(null);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await api.get('/api/spaces');
        const formattedSpaces = response.data.map(space => ({
          id: space.spaceId, 
          title: space.sname,
          coverType: space.sthumb,
          isPinned: space.isPrimary,
          isPublic: space.isPublic,
        }));
        setSpaces(formattedSpaces);
      } catch (error) {
        console.error('Error fetching spaces:', error);
        setSpaces([]);
      }
    };

    fetchSpaces();
  }, []);

  useEffect(() => {
    setIsScrollable(spaces.length > 5);
  }, [spaces]);

  // 외부 클릭 시 아카이브 닫기 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (archiveRef.current && !archiveRef.current.contains(event.target)) {
        toggleArchive();
      }
    };

    if (isArchiveOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isArchiveOpen, toggleArchive]);

  // 클릭 시 공간 이동 
  const handleListBoxClick = (spaceId, title, sthumb) => {
    setSelectedSpace({ spaceId, title, sthumb });
    console.log(`Selected space: ${spaceId}, ${title}, ${sthumb}`);
    // homediary에 상태를 전달하는 로직을 추가하세요
  };

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
  const handleDeleteSpace = async (spaceId) => {
    try {
      await api.delete(`/api/spaces/${spaceId}`);
      setSpaces((prevSpaces) => prevSpaces.filter((space) => space.id !== spaceId));
    } catch (error) {
      console.error('Error deleting space:', error);
    }
  };

  // 공개/비공개 전환 기능
  const handleSwitchToggle = (id) => {
    setSpaces((prevSpaces) => prevSpaces.map((space) => 
      space.id === id ? { ...space, isPublic: !space.isPublic } : space 
      )
    );
  };

  const handleTrashClick = (spaceId) => {
    setSelectedSpace(spaceId);
    setIsAlertOpen(true);
    console.log('Trash Clicked, spaceId:', spaceId);
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (selectedSpace.spaceId) {
      await handleDeleteSpace(selectedSpace.spaceId);
      setIsAlertOpen(false);
      console.log('Confirm Delete, selectedSpace:', selectedSpace);
    }
  };

  return (
    <>
      {isArchiveOpen && (
        <ArchiveList ref={archiveRef} isScrollable={isScrollable}>
            {spaces.map((space) => (
              <ListBox 
                key={space.id}
                isSelected={selectedSpace.spaceId === space.id}
                onClick={() => handleListBoxClick(space.id, space.title, space.coverType)}
              >
                  <FixModal
                    id={space.spaceId}
                    isPinned={space.isPinned}
                    onPinToggle={handlePinToggle}
                  />
                  <TitleContainer> {space.title} </TitleContainer>
                  <SwitchModal
                    spaceId={space.spaceId}
                    isPublic={space.isPublic}
                    onSwitchToggle={handleSwitchToggle}
                  />
                  <TrashButton onClick={() => handleTrashClick(space.id)}>
                    <FiTrash2 />
                  </TrashButton>
              </ListBox>
            ))}
        </ArchiveList>
      )}
      {isAlertOpen && (
        <Alert
          spaceId={selectedSpace.spaceId}
          isOpen={isAlertOpen}
          message="정말로 삭제하시겠습니까?"
          onClose={handleCloseAlert}
          onConfirm={handleConfirmDelete}
          confirmText="삭제"
        />
      )}
    </>
  );
};

ArchiveButton.propTypes = {
  isArchiveOpen: PropTypes.bool.isRequired,
  toggleArchive: PropTypes.func.isRequired,
};

export default ArchiveButton;

const TrashButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  color: red;
  font-size: 17px;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin-right: 5px;

  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s ease-in-out;
  }

  &:focus {
    outline: none;
  }
`;

export const TrashModal = ({ spaceId, onDelete }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false); 

  const handleTrashClick = () => {
    setIsAlertOpen(true);
  };
  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/api/spaces/${spaceId}`);
      onDelete(spaceId);
    } catch (error) {
      console.error('Error deleting space:', error);
    }
    handleCloseAlert();
  };

  console.log('TrashModal received spaceId:', spaceId);

  return (
    <>
      <TrashButton onClick={handleTrashClick}>
        <FiTrash2 /> 
      </TrashButton>

      <Alert
        spaceId={spaceId}
        isOpen={isAlertOpen}
        message="정말로 삭제하시겠습니까?"
        onClose={handleCloseAlert}
        onConfirm={handleConfirmDelete}
        confirmText="삭제"
      />
    </>
  );
};
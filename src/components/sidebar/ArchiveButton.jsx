// src/components/sidebar/ArchiveButton.js
import React, { useState, useContext, useRef } from "react";
import { ArchiveList, ListBox, TitleContainer } from "../../styles/sidebar/ArchiveButtonStyle";
import { FiBookOpen, FiBook, FiTrash2 } from "react-icons/fi";
import { BsPinAngle, BsPinAngleFill } from "react-icons/bs";
import Alert from "../alert/AddTrashAlert";
import styled from "styled-components";
import PropTypes from 'prop-types';
import { SpaceContext } from '../../context/SpaceContext';
import api from '../../api/api'; // 필요한 경우 추가 API 호출 함수 사용

const ArchiveButton = ({ isArchiveOpen, toggleArchive }) => {
  const [isScrollable, setIsScrollable] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { spaces, setSpaces, setSelectedSpace, setActiveSpace, selectedSpace } = useContext(SpaceContext);
  const archiveRef = useRef(null);

  // 외부 클릭 시 아카이브 닫기 
  React.useEffect(() => {
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

  // spaces 변경 시 스크롤 여부 설정
  React.useEffect(() => {
    setIsScrollable(spaces.length > 5);
  }, [spaces]);

  // 클릭 시 공간 이동 
  const handleListBoxClick = (spaceId, title, coverType) => {
    const selectedSpaceData = { id: spaceId, title, coverType };
    setSelectedSpace(selectedSpaceData);
    setActiveSpace(selectedSpaceData);
    console.log(`Selected space: ${spaceId}, ${title}, ${coverType}`);
    toggleArchive(); // Close archive after selection
};


  // 핀버튼 클릭 시 isPrimary 토글
  const handlePinToggle = async (spaceId) => {
    const currentSpace = spaces.find(space => space.id === spaceId);
    if (!currentSpace) {
      console.error('Space not found:', spaceId);
      return;
    }
    try {
      const url = `/api/spaces/${spaceId}`;
      const data = { "isPrimary": !currentSpace.isPrimary };

      const response = await api.put(url, data);
      if (response.status === 200) {
        const updatedSpace = response.data;
        const updatedSpaces = spaces.map(space => 
          space.id === spaceId ? {
            id: updatedSpace.spaceId,
            title: updatedSpace.sname,
            coverType: updatedSpace.sthumb,
            isPrimary: updatedSpace.isPrimary,
            isPublic: updatedSpace.isPublic,
          } : space
        );
        setSpaces(updatedSpaces);
        console.log('Updated Spaces after pin toggle:', updatedSpaces);

        // 업데이트된 공간이 primary인 경우, activeSpace를 업데이트
        if (updatedSpace.isPrimary) {
          const primarySpaceData = {
            id: updatedSpace.id,
            title: updatedSpace.title,
            coverType: updatedSpace.coverType,
          };
          setSelectedSpace(primarySpaceData);
          setActiveSpace(primarySpaceData);
        }
      }
    } catch (error) {
      console.error('Error pinning space:', error);
    }
  };

  // 공개/비공개 전환 기능
  const handlePublicToggle = async (spaceId) => {
    const currentSpace = spaces.find(space => space.id === spaceId);
    if (!currentSpace) {
      console.error('Space not found:', spaceId);
      return;
    }
    try {
      const url = `/api/spaces/${spaceId}`;
      const data = { isPublic: !currentSpace.isPublic };

      const response = await api.put(url, data);
      if (response.status === 200) {
        const updatedSpace = response.data;
        const updatedSpaces = spaces.map(space => 
          space.id === spaceId ? {
            id: updatedSpace.spaceId,
            title: updatedSpace.sname,
            coverType: updatedSpace.sthumb,
            isPrimary: updatedSpace.isPrimary,
            isPublic: updatedSpace.isPublic,
          } : space
        );
        setSpaces(updatedSpaces);
        console.log('Updated Spaces after public toggle:', updatedSpaces);
      }
    } catch (error) {
      console.error('Error updating public status:', error);
    }
  };

  // trash 삭제 기능 
  const handleDeleteSpace = async (spaceId) => {
    try {
      await api.delete(`/api/spaces/${spaceId}`);
      const updatedSpaces = spaces.filter(space => space.id !== spaceId);
      setSpaces(updatedSpaces);
      console.log('Spaces after deletion:', updatedSpaces);

      // 선택된 공간이 삭제되었을 경우 activeSpace 업데이트
      if (selectedSpace && selectedSpace.id === spaceId) {
        setSelectedSpace(null);
        setActiveSpace(null);
      }
    } catch (error) {
      console.error('Error deleting space:', error);
    }
  };

  const handleTrashClick = (spaceId) => {
    const selectedSpaceData = spaces.find(space => space.id === spaceId);
    if (selectedSpaceData) {
      setSelectedSpace(selectedSpaceData);
      setIsAlertOpen(true);
      console.log('Trash Clicked, spaceId:', spaceId);
    }
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (selectedSpace) {
      await handleDeleteSpace(selectedSpace.id);
      setIsAlertOpen(false);
      console.log('Confirm Delete, selectedSpace:', selectedSpace);
      setSelectedSpace(null);
      setActiveSpace(null);
    }
  };

  return (
    <>
      {isArchiveOpen && (
        <ArchiveList ref={archiveRef} isScrollable={isScrollable}>
            {spaces.map((space) => (
              <ListBox 
                key={space.id}
                isSelected={space.id === selectedSpace?.id}
                onClick={() => handleListBoxClick(space.id, space.title, space.coverType)}
              >
                  <PrimaryButton
                    spaceId={space.id}
                    isPrimary={space.isPrimary}
                    onPinToggle={handlePinToggle}
                  />
                  <TitleContainer> {space.title} </TitleContainer>
                  <PublicButton
                    spaceId={space.id}
                    isPublic={space.isPublic}
                    onSwitchToggle={handlePublicToggle}
                  />
                  <TrashButton onClick={() => handleTrashClick(space.id)}>
                    <FiTrash2 />
                  </TrashButton>
              </ListBox>
            ))}
        </ArchiveList>
      )}
      {isAlertOpen && selectedSpace && (
        <Alert
          spaceId={selectedSpace.id}
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

const PinButton = styled.div`
  width: 15px;
  height: 15px;
  cursor: pointer;
  margin-left: 6px;
  margin-right: 0px; /* 핀버튼 ~ 제목 */

  filter: ${({ isPinned }) =>
    isPinned 
      ? "invert(20%) sepia(0%) saturate(0%) hue-rotate(0deg)" 
      : "invert(60%) sepia(10%) saturate(300%) hue-rotate(180deg)"};

  &:hover {
    filter:  invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg);
    transition: transform 0.2s ease-in-out;
  }
`;

export const PrimaryButton = ({ spaceId, isPrimary, onPinToggle }) => {
  console.log('PrimaryButton isPrimary:', isPrimary);
  return (
    <PinButton
      id={spaceId}
      isPinned={isPrimary}
      onClick={() => onPinToggle(spaceId)}
    >
      {isPrimary ? <BsPinAngleFill /> : <BsPinAngle />}
    </PinButton>
  );
};

const SwitchButton = styled.div`  cursor: pointer;
  display: flex;
  margin-right: 3px; /* 책 ~ 쓰레기통 */
  font-size: 17px;
  align-items: center;
  justify-content: center;
  padding: 5px;

  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s ease-in-out;
  }
`;

export const PublicButton = ({ spaceId, isPublic, onSwitchToggle }) => {
  const handleClick = () => {
    onSwitchToggle(spaceId);
  };

  return (
    <SwitchButton onClick={handleClick}>
      {isPublic ? <FiBookOpen /> : <FiBook />}
    </SwitchButton>
  );
};



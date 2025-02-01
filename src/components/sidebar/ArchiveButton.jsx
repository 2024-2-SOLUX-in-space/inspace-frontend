import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from 'prop-types';
import { FiBookOpen, FiBook, FiTrash2 } from "react-icons/fi";
import { BsPinAngle, BsPinAngleFill } from "react-icons/bs";
import styled from "styled-components";
import Alert from "../alert/AddTrashAlert";
import { ArchiveList, ListBox, TitleContainer } from "../../styles/sidebar/ArchiveButtonStyle";
import api from '../../api/api';
import { SpaceContext } from '../../context/SpaceContext';


const ArchiveButton = ({ isArchiveOpen, toggleArchive }) => {
  const [isScrollable, setIsScrollable] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { spaces, setSpaces, setSelectedSpace, setActiveSpace, selectedSpace } = useContext(SpaceContext);
  const archiveRef = useRef(null);

  // 백엔드 응답을 프론트엔드 필드명으로 매핑하는 함수
  const mapBackendToFrontend = (backendSpace) => ({
    id: backendSpace.spaceId,
    title: backendSpace.sname,
    coverType: backendSpace.sthumb,
    isPrimary: backendSpace.isPrimary,
    isPublic: backendSpace.isPublic,
  });

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

  // spaces 변경 시 스크롤 여부 설정
  useEffect(() => {
    setIsScrollable(spaces.length > 5);
  }, [spaces]);

  // 클릭 시 공간 이동 
  const handleListBoxClick = (spaceId, title, coverType) => {
    const selectedSpaceData = { id: spaceId, title, coverType };
    setSelectedSpace(selectedSpaceData);
    setActiveSpace(selectedSpaceData);
    toggleArchive();
  };

  // 공통 토글 함수
  const handleToggle = async (spaceId, field) => {
    const currentSpace = spaces.find(space => space.id === spaceId);
    if (!currentSpace) {
      console.error('Space not found:', spaceId);
      return;
    }

    if (field === 'isPrimary') {
      const newIsPrimary = !currentSpace.isPrimary;

      // 공간 편집 api 호출 전 공간 상태 업데이트
      setSpaces(prevSpaces => prevSpaces.map(space => 
        space.id === spaceId ? { ...space, isPrimary: newIsPrimary } : { ...space, isPrimary: false }
      ));

      try {
        const url = `/api/spaces/${spaceId}`;
        const data = { [field]: newIsPrimary };

        const response = await api.patch(url, data);
        if (response.status === 200) {
          const updatedSpace = mapBackendToFrontend(response.data);
          
          // isPrimary가 true인 경우 다른 모든 공간의 isPrimary를 false로 설정
          const updatedSpaces = spaces.map(space => 
            space.id === spaceId ? updatedSpace : { ...space, isPrimary: false }
          );
          setSpaces(updatedSpaces);

          // isPrimary가 true인 경우 activeSpace 업데이트
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
        console.error(`Error toggling ${field} for space:`, error);
        // 실패 시 원래 상태로 롤백
        setSpaces(prevSpaces => prevSpaces.map(space => 
          space.id === spaceId ? { ...space, isPrimary: currentSpace.isPrimary } : space
        ));
      }

    } else {
      setSpaces(prevSpaces => prevSpaces.map(space => 
        space.id === spaceId ? { ...space, [field]: !space[field] } : space
      ));

      try {
        const url = `/api/spaces/${spaceId}`;
        const data = { [field]: !currentSpace[field] };

        const response = await api.patch(url, data);
        if (response.status === 200) {
          const updatedSpace = mapBackendToFrontend(response.data);
          setSpaces(prevSpaces => prevSpaces.map(space => 
            space.id === spaceId ? updatedSpace : space
          ));
        }
      } catch (error) {
        console.error(`Error toggling ${field} for space:`, error);
        // 실패 시 원래 상태로 롤백
        setSpaces(prevSpaces => prevSpaces.map(space => 
          space.id === spaceId ? { ...space, [field]: currentSpace[field] } : space
        ));
      }
    }
  };

  // 핀버튼 클릭 시 isPrimary 토글
  const handlePinToggle = (spaceId) => handleToggle(spaceId, 'isPrimary');

  // 공개/비공개 전환 기능
  const handlePublicToggle = (spaceId) => handleToggle(spaceId, 'isPublic');

  // trash 삭제 기능 
  const handleDeleteSpace = async (spaceId) => {
    try {
      await api.delete(`/api/spaces/${spaceId}`);
      setSpaces(prevSpaces => prevSpaces.filter(space => space.id !== spaceId));
      console.log('Spaces after deletion:', spaces);

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
    }
  };

  // 모달 닫기 함수 수정: isAlertOpen과 selectedSpace 모두 초기화
  const handleCloseAlert = () => {
    setIsAlertOpen(false);
    setSelectedSpace(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedSpace) {
      await handleDeleteSpace(selectedSpace.id);
      setIsAlertOpen(false);
      setSelectedSpace(null);
      setActiveSpace(null);
    }
  };

  // 공간 목록을 isPrimary 기준으로 정렬 (isPrimary: true인 공간이 상단에 위치)
  const sortedSpaces = [...spaces].sort((a, b) => b.isPrimary - a.isPrimary);

  return (
    <>
      {isArchiveOpen && (
        <ArchiveList ref={archiveRef} isScrollable={isScrollable}>
          {sortedSpaces.map((space) => (
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
              <TrashButton onClick={(e) => {
                e.stopPropagation();
                handleTrashClick(space.id);
              }}>
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

const PinButton = styled.div`
  width: 20px;
  height: 20px;
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
  return (
    <PinButton
      id={spaceId}
      isPinned={isPrimary}
      onClick={(e) => {
        e.stopPropagation();
        onPinToggle(spaceId);
      }}
    >
      {isPrimary ? <BsPinAngleFill /> : <BsPinAngle />}
    </PinButton>
  );
};

PrimaryButton.propTypes = {
  spaceId: PropTypes.number.isRequired,
  isPrimary: PropTypes.bool.isRequired,
  onPinToggle: PropTypes.func.isRequired,
};

const SwitchButton = styled.div`  
  cursor: pointer;
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
  const handleClick = (e) => {
    e.stopPropagation();
    onSwitchToggle(spaceId);
  };

  return (
    <SwitchButton onClick={handleClick}>
      {isPublic ? <FiBookOpen /> : <FiBook />}
    </SwitchButton>
  );
};

PublicButton.propTypes = {
  spaceId: PropTypes.number.isRequired,
  isPublic: PropTypes.bool.isRequired,
  onSwitchToggle: PropTypes.func.isRequired,
};

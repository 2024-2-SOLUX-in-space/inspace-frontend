import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import { FiBookOpen, FiBook, FiTrash2 } from "react-icons/fi";
import { BsPinAngle, BsPinAngleFill } from "react-icons/bs";
import styled from "styled-components";
import Alert from "../alert/AddTrashAlert";
import { ArchiveList, ListBox, TitleContainer } from "../../styles/sidebar/ArchiveButtonStyle";
import api from '../../api/api';
import { useSelector, useDispatch } from 'react-redux';
import { setSpaces, fetchSpaces, modifySpace, setSelectedSpace, setActiveSpace } from '../../redux/actions/spaceActions';

const ArchiveButton = ({ isArchiveOpen, toggleArchive }) => {
  const [isScrollable, setIsScrollable] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const archiveRef = useRef(null);
  const dispatch = useDispatch();
  const spaces = useSelector(state => state.space.spaces);
  const selectedSpace = useSelector(state => state.space.selectedSpace);
  const activeSpace = useSelector(state => state.space.activeSpace);

  useEffect(() => {
    dispatch(fetchSpaces());
  }, [dispatch]);

  // ✅ `spaces` 상태가 업데이트될 때 로그 확인
  useEffect(() => {
    console.log("🔄 spaces 상태 업데이트:", spaces);
  }, [spaces]);

  useEffect(() => {
    console.log("🟢 Active space 변경됨:", activeSpace);
  }, [activeSpace]);

  // ✅ `sortedSpaces` 선언 후 로그 출력 (ReferenceError 방지)
  const sortedSpaces = [...spaces].sort((a, b) => b.isPrimary - a.isPrimary);
  console.log("🔎 정렬된 공간 목록:", sortedSpaces);

  useEffect(() => {
    setIsScrollable(spaces.length > 5);
  }, [spaces]);

  const handleListBoxClick = (spaceId, title, coverType) => {
    console.log(`🟢 공간 클릭됨: ID=${spaceId}, 제목=${title}`);
    dispatch(setSelectedSpace({ id: spaceId, title, coverType }));
    dispatch(setActiveSpace({ id: spaceId, title, coverType }));
    toggleArchive();
  };

  const handleToggle = async (spaceId, field) => {
    console.log(`🚀 handleToggle 실행! 공간 ID=${spaceId}, 필드=${field}`);

    const currentSpace = spaces.find(space => space.id === spaceId);
    if (!currentSpace) {
      console.error('❌ Space not found:', spaceId);
      return;
    }

    const newValue = !currentSpace[field];

    // ✅ 기존 배열 순서를 유지하면서 isPrimary만 업데이트
    let updatedSpaces = spaces.map(space =>
      space.id === spaceId
        ? { ...space, [field]: newValue }
        : field === "isPrimary"
          ? { ...space, isPrimary: false } // 다른 공간들의 isPrimary를 false로 변경
          : space
    );

    dispatch(setSpaces(updatedSpaces)); // Redux 상태 즉시 업데이트

    // ✅ primarySpace를 localStorage에 저장
    if (field === "isPrimary" && newValue) {
      const primarySpace = updatedSpaces.find(space => space.isPrimary);
      if (primarySpace) {
        dispatch(setActiveSpace(primarySpace));
        localStorage.setItem('primarySpace', JSON.stringify(primarySpace));
        console.log("🏠 대표 공간 변경됨 & 저장됨:", primarySpace);
      }
    }

    try {
      const url = `/api/spaces/${spaceId}`;
      const data = { [field]: newValue };

      console.log("📡 PATCH 요청 전송:", url, "보낼 데이터:", data);
      const response = await api.patch(url, data);
      console.log("✅ PATCH 응답 받음:", response.data);

      if (response.status === 200) {
        dispatch(modifySpace(spaceId, response.data));
      } else {
        console.error("⚠ 서버 응답 실패. fetchSpaces() 실행.");
        dispatch(fetchSpaces());
      }
    } catch (error) {
      console.error(`❌ PATCH 요청 실패:`, error);
      alert("⚠ 변경 실패! 다시 시도해주세요.");
      dispatch(fetchSpaces());
    }
  };


// ✅ 삭제 상태 추가 (삭제할 공간 저장)
const [spaceToDelete, setSpaceToDelete] = useState(null);

// ✅ 삭제 확인 창 열기
const handleTrashClick = (space) => {
  setSpaceToDelete(space);
  setIsAlertOpen(true);
};

// ✅ 삭제 실행 함수
const handleDeleteConfirmed = async () => {
  if (!spaceToDelete) return;
  try {
    console.log("🗑 삭제 요청 실행:", spaceToDelete.id);
    await api.delete(`/api/spaces/${spaceToDelete.id}`);

    // Redux 상태에서 해당 공간 삭제
    dispatch(setSpaces(spaces.filter(space => space.id !== spaceToDelete.id)));
    console.log("✅ 삭제 완료, 상태 업데이트됨");

    // 선택된 공간이 삭제되었으면 초기화
    if (selectedSpace?.id === spaceToDelete.id) {
      dispatch(setSelectedSpace(null));
      dispatch(setActiveSpace(null));
    }
  } catch (error) {
    console.error('❌ 공간 삭제 중 오류 발생:', error);
    alert("⚠ 삭제 실패! 다시 시도해주세요.");
  } finally {
    setIsAlertOpen(false); // 알림창 닫기
    setSpaceToDelete(null);
  }
};

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
            <PrimaryButton spaceId={space.id} isPrimary={space.isPrimary} onToggle={handleToggle} />
            <TitleContainer> {space.title} </TitleContainer>
            <PublicButton spaceId={space.id} isPublic={space.isPublic} onToggle={handleToggle} />
            <TrashButton onClick={(e) => {
              e.stopPropagation();
              handleTrashClick(space); // ✅ 삭제 확인 창 열기
            }}>
              <FiTrash2 />
            </TrashButton>
          </ListBox>
        ))}
      </ArchiveList>
    )}

    {/* ✅ 삭제 확인 `Alert` 추가 */}
    {isAlertOpen && spaceToDelete && (
      <Alert
        isOpen={isAlertOpen}
        spaceId={spaceToDelete.id}
        message={`정말로 "${spaceToDelete.title}"을(를) 삭제하시겠습니까?`}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={handleDeleteConfirmed}
        confirmText="삭제"
      />
    )}
  </>
);


};

export default ArchiveButton;

const TrashButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: red;
  font-size: 17px;
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

const PrimaryButtonStyled = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 17px;
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

export const PrimaryButton = ({ spaceId, isPrimary, onToggle }) => (
  <PrimaryButtonStyled onClick={(e) => {
    e.stopPropagation();
    console.log("📌 핀 버튼 클릭됨! 공간 ID:", spaceId);
    onToggle(spaceId, 'isPrimary');
  }}>
    {isPrimary ? <BsPinAngleFill /> : <BsPinAngle />}
  </PrimaryButtonStyled>
);

const PublicButtonStyled = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 17px;
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

export const PublicButton = ({ spaceId, isPublic, onToggle }) => (
  <PublicButtonStyled onClick={(e) => {
    e.stopPropagation();
    console.log("📌 공개 버튼 클릭됨! 공간 ID:", spaceId);
    onToggle(spaceId, 'isPublic');
  }}>
    {isPublic ? <FiBookOpen /> : <FiBook />}
  </PublicButtonStyled>
);

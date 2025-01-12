import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi"; 
import { TrashButton } from "../styles/TrashModelStyle"; 
import TrashAlert from "./TrashAlert";

const TrashModel = ({ spaceId, onDelete }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false); // 알림창 상태

  // 알림창 열기
  const handleTrashClick = () => {
    setIsAlertOpen(true);
  };

  // 알림창 닫기
  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  // 삭제 확인 처리
  const handleConfirmDelete = () => {
    onDelete(spaceId); // 부모 컴포넌트로 삭제 요청 전달

    // TODO: 삭제 API 요청을 추가하여 서버와 동기화
    // 예: axios.delete(`/api/spaces/${spaceId}`)
    console.log(`백엔드로 공간 ${spaceId} 삭제 요청 전송`);

    handleCloseAlert(); // 알림창 닫기
  };

  return (
    <>
      <TrashButton onClick={handleTrashClick}>
        <FiTrash2 /> 
      </TrashButton>

      <TrashAlert
        isOpen={isAlertOpen}
        message="정말로 삭제하시겠습니까?"
        onClose={handleCloseAlert}
        onConfirm={handleConfirmDelete}
        confirmText="삭제"
      />
    </>
  );
};

export default TrashModel;
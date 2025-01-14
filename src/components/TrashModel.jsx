import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi"; 
import { TrashButton } from "../styles/TrashModelStyle"; 
import TrashAlert from "./TrashAlert";

const TrashModel = ({ spaceId, onDelete }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false); 

  const handleTrashClick = () => {
    setIsAlertOpen(true);
  };
  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  const handleConfirmDelete = () => {
    onDelete(spaceId); // ArchiveButton으로 삭제 요청 전달
    // **추후 연동 필요 ** 삭제 API 요청, 서버와 동기화
    handleCloseAlert(); 
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
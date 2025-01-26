import React, { useState } from "react";
import styled from "styled-components";
import { FiTrash2 } from "react-icons/fi"; 
import Alert from "../alert/AddTrashAlert";
import api from '../../api/api';

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

const TrashModal = ({ spaceId, onDelete }) => {
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

export default TrashModal;
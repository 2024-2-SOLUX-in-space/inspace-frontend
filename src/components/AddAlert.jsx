import React from 'react';
import styled from 'styled-components';

const AlertOverlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding-top: 10vh;
`;

const AlertBackground = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 75px;
  right: 0;
  bottom: 0;
`;

const AlertContent = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  max-width: 28rem;
  width: 100%;
  margin: 0 1rem;
  position: relative;
  z-index: 10;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const AlertHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const AlertTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
`;

const CloseButton = styled.button`
  position: absolute;
  background: none;
  border: none;
  top: 0.75rem;
  right: 0.75rem;
  outline: none;
  color: black;
  &:focus {
    outline: none;
  }
`;

const AlertMessage = styled.p`
  color: rgb(0, 0, 0);
  margin-bottom: 2rem;
`;

const ConfirmButton = styled.button`
  width: auto;
  min-width: 80px;
  background-color: #111827;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  display: block;
  margin-left: auto;
  &:hover {
    background-color: #1F2937;
  }
`;

const AddAlert = ({ isOpen, message = "공간이 추가되었습니다!", onClose, onConfirm, confirmText = "확인" }) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onClose();
    if (onConfirm) {
      onConfirm();
    }
  };

  return (
    <AlertOverlay>
      <AlertBackground />
      <AlertContent>
        <AlertHeader>
          <AlertTitle>알림</AlertTitle>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </AlertHeader>
        <AlertMessage>{message}</AlertMessage>
        <ConfirmButton onClick={handleConfirm}>
          {confirmText}
        </ConfirmButton>
      </AlertContent>
    </AlertOverlay>
  );
};

export default AddAlert;


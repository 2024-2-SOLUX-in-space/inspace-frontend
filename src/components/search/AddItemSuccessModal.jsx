import React from 'react';
import { FaTimes } from 'react-icons/fa';

const AddItemSuccessModal = ({ isOpen, onClose, onMove }) => {
  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <h3 style={titleStyle}>알림</h3>
          <button style={closeButtonStyle} onClick={onClose}>
            <FaTimes size={16} />
          </button>
        </div>

        {/* Content */}
        <p style={contentTextStyle}>성공적으로 추가되었습니다!</p>

        {/* Footer Buttons */}
        <div style={footerStyle}>
          <button style={moveButtonStyle} onClick={onMove}>
            내 공간으로 이동
          </button>
          <button style={confirmButtonStyle} onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

// 스타일 정의
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyle = {
  background: 'white',
  borderRadius: '12px',
  width: '360px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
  textAlign: 'center',
  padding: '20px',
  position: 'relative',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '10px',
};

const titleStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
  margin: 0,
};

const closeButtonStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '5px',
  position: 'absolute',
  top: '10px',
  right: '10px',
};

const contentTextStyle = {
  fontSize: '14px',
  color: '#333',
  margin: '20px 0',
  marginRight: '150px',
};

const footerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px',
};

const moveButtonStyle = {
  backgroundColor: '#f5f5f5',
  color: '#333',
  border: '1px solid #ddd',
  borderRadius: '20px',
  padding: '10px 15px',
  fontSize: '14px',
  cursor: 'pointer',
  marginLeft: '130px',
};

const confirmButtonStyle = {
  backgroundColor: '#333',
  color: 'white',
  border: 'none',
  borderRadius: '20px',
  padding: '10px 15px',
  fontSize: '14px',
  cursor: 'pointer',
};

export default AddItemSuccessModal;

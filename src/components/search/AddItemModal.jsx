import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const AddItemModal = ({ isOpen, spaces, onClose, onSuccess }) => {
  const [selectedSpace, setSelectedSpace] = useState(null);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!selectedSpace) {
      alert('공간을 선택해주세요.');
      return;
    }

    console.log('선택된 spaceId:', selectedSpace); // 선택된 공간 ID 출력

    try {
      onSuccess(selectedSpace); // onSuccess로 spaceId 전달
      onClose();
    } catch (error) {
      console.error('onSuccess 호출 중 오류:', error);
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={headerStyle}>
          <h3 style={titleStyle}>공간을 선택하세요</h3>
          <button style={closeButtonStyle} onClick={onClose}>
            <FaTimes size={16} />
          </button>
        </div>
        <div style={contentStyle}>
          {spaces.map((space) => (
            <div
              key={space.spaceId}
              style={{
                ...spaceItemStyle,
                backgroundColor:
                  selectedSpace === space.spaceId ? '#f5f5f5' : 'white',
              }}
              onClick={() => setSelectedSpace(space.spaceId)}
            >
              <img
                src="/src/assets/img/button/Bookopen.png"
                alt="Icon"
                style={iconStyle}
              />
              <span>{space.sname}</span>
            </div>
          ))}
        </div>
        <button style={confirmButtonStyle} onClick={handleConfirm}>
          확인
        </button>
      </div>
    </div>
  );
};

// 스타일 수정
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
  borderRadius: '10px',
  width: '450px',
  maxHeight: '500px', // 모달의 최대 높이를 설정
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  padding: '20px',
  overflow: 'hidden', // 모달 내용이 넘치지 않도록 설정
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
};

const titleStyle = {
  fontSize: '18px',
  margin: 0,
};

const closeButtonStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
  marginLeft: '50px',
};

const contentStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  maxHeight: '300px', // 모달 내부에서 스크롤이 가능하도록 설정
  overflowY: 'auto', // 세로 스크롤 활성화
  marginBottom: '30px',
};

const spaceItemStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  borderBottom: '1px solid #ddd',
  cursor: 'pointer',
};

const iconStyle = {
  marginRight: '10px',
  width: '24px',
  height: '24px',
};

const confirmButtonStyle = {
  position: 'absolute',
  bottom: '20px',
  right: '30px',
  backgroundColor: '#000',
  color: 'white',
  border: 'none',
  borderRadius: '20px',
  padding: '10px 20px',
  fontSize: '14px',
  cursor: 'pointer',
};

export default AddItemModal;

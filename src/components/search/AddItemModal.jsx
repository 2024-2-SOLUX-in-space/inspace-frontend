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

    // 현재 모달 닫기 후 Success Modal 열기
    onClose();
    setTimeout(() => {
      onSuccess();
    }, 300); // 부드럽게 전환

    // API 연동 코드 주석 처리
    /*
    const payload = { spaceId: selectedSpace };
    try {
      const response = await axios.post('API_URL_HERE', payload, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    */
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
          {spaces.map((space, index) => (
            <div
              key={index}
              style={{
                ...spaceItemStyle,
                backgroundColor: selectedSpace === space ? '#f5f5f5' : 'white',
              }}
              onClick={() => setSelectedSpace(space)}
            >
              <img
                src={
                  index % 2 === 0
                    ? '/src/assets/img/button/Bookopen.png'
                    : '/src/assets/img/button/Bookclose.png'
                }
                alt="Icon"
                style={iconStyle}
              />
              <span>{space}</span>
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

// CSS 스타일 정의
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
  height: '300px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  padding: '20px',
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
  marginBottom: '30px',
  overflowY: 'auto',
  maxHeight: '300px',
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

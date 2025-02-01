import React, { useState, useRef, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { SpaceContext } from '../../context/SpaceContext';
import api from '../../api/api';
import Modal from 'react-modal';

const ModalStyles = {
  overlay: {
    backgroundColor: 'rgba(1, 1, 1, 0.5)',
    zIndex:3000,
    pointerEvents: 'auto',
  },
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    height: '80%',
    backgroundColor: '#ffffff',
    padding: '35px 40px',
    border: 'none',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
};

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.35rem;
  cursor: pointer;
  padding: 0;
  outline: none;
  
  &:focus {
    outline: none;
  }
`;

const CropContainer = styled.div`
  flex: 1;
  min-height: 100px;
  margin-bottom: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  
  & > div {
    max-width: 100%;
    display: flex;
    justify-content: center;
  }
  
  img {
    max-width: 100%;
    max-height: 450px;
    object-fit: contain;
  }
`;

const Canvas = styled.canvas`
  width: 0;
  height: 0;
  visibility: hidden;
`;
const InputContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  bottom: 25px;
  width: 90%;
`;

const Input = styled.input`
  width: 90%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 0.375rem;
  font-size: 1.25rem;
  outline: none;
`;

const SaveButton = styled.button`
  min-width: 70px;
  height: 3rem;
  background-color: #111827;
  padding: 0.75rem 1rem;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    background-color: #1F2937;
  }

  &:focus {
    outline: none;
  }
`;

const ImageAddModal = ({ isOpen, onClose, imageFile, onSave }) => {
  if (typeof onSave !== 'function') {
    console.error('onSave is not a function');
  }

  const maxLength = 20;
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [title, setTitle] = useState('');
  const [crop, setCrop] = useState({
    unit: 'px',
    x: 0,
    y: 0,
    width: 75,
    height: 75
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const { activeSpace } = useContext(SpaceContext);

  const onLoad = useCallback((img) => {
    imgRef.current = img;
    setCrop({
      unit: 'px',
      x: 0,
      y: 0,
      width: img.width,
      height: img.height
    });
  }, []);

  const handleClose = () => {
    setTitle('');
    setCrop({ unit: 'px', x: 0, y: 0, width: 10, height: 10 });
    setCompletedCrop(null);
    onClose();
  };

  const createCroppedImage = useCallback(() => {
    if (!completedCrop || !canvasRef.current || !imgRef.current) {
      return;
    }
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // 원본 이미지 크기 비율
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

    const cropWidth = completedCrop.width * scaleX;
    const cropHeight = completedCrop.height * scaleY;
    const cropX = completedCrop.x * scaleX;
    const cropY = completedCrop.y * scaleY;

    canvasRef.current.width = cropWidth;
    canvasRef.current.height = cropHeight;

    ctx.fillStyle = '#FFFFFF'; 
    ctx.fillRect(0, 0, cropWidth, cropHeight);

    ctx.drawImage(
      imgRef.current,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );
  }, [completedCrop]);

  const handleSave = useCallback(async () => {
    if (!completedCrop) return;
    createCroppedImage();

    canvasRef.current.toBlob(
      async (blob) => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }

        const formData = new FormData();
        formData.append('file', blob, 'cropped-image.png');

        try {
          const response = await api.post(
            `/api/image?spaceId=${activeSpace?.id}&title=${title}`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
          );

          if (onSave) {
            onSave(response.data); 
          }

          handleClose();
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      },
      'image/png',
      1
    );
  }, [completedCrop, createCroppedImage, title, handleClose, activeSpace, onSave]);

  const handleTitleChange = useCallback((e) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setTitle(value);
    }
  }, [maxLength]);

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="이미지 추가 모달"
      style={{
        overlay: ModalStyles.overlay,
        content: ModalStyles.modal,
      }}
    >
      <ModalHeader>
        <Title>이미지의 제목을 입력해주세요 ({title.length}/{maxLength})</Title>
        <CloseButton onClick={handleClose}>✕</CloseButton>
        </ModalHeader>
        
        <CropContainer>
          {imageFile && (
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              onImageLoaded={onLoad}
              minWidth={100}
              minHeight={100}
            >
              <img
                ref={imgRef}
                src={URL.createObjectURL(imageFile)}
                alt="크롭할 이미지"
                style={{ maxWidth: '100%', maxHeight: '450px' }}
              />
            </ReactCrop>
          )}
        </CropContainer>
        
        <InputContainer>
          <Input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="제목을 입력하세요 (최대 20자)"
            maxLength={maxLength}
          />
          <SaveButton onClick={handleSave}>저장</SaveButton>
        </InputContainer>

        <Canvas ref={canvasRef} />
    </Modal>
  );
};

ImageAddModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  imageFile: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};

export default ImageAddModal;
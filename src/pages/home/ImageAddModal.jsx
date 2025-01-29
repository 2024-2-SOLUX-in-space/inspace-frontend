import React, { useState, useRef, useCallback, useContext } from 'react';
import styled from 'styled-components';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { SpaceContext } from '../../context/SpaceContext';
import api from '../../api/api';
import PropTypes from 'prop-types';

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
  pointer-events: auto;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem ;
  width: 50%;
  height: 70%;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  outline: none;
  cursor: pointer;
  padding: 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  font-size: 1.25rem;
  outline: none;
`;

const SaveButton = styled.button`
  background-color: #111827;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  float: right;
  cursor: pointer;
  
  &:hover {
    background-color: #1F2937;
  }
`;

const CropContainer = styled.div`
  flex: 1;
  min-height: 0;
  margin-bottom: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  
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

const BottomContainer = styled.div`
  margin-top: auto;
`;

const Canvas = styled.canvas`
  width: 0;
  height: 0;
  visibility: hidden;
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
    width: 10,
    height: 10
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
    setCrop({
      unit: 'px',
      x: 0,
      y: 0,
      width: 10,
      height: 10
    });
    setCompletedCrop(null);
    onClose();
  };

const createCroppedImage = useCallback(() => {
  if (!completedCrop || !canvasRef.current || !imgRef.current) {
    return;
  }

  const ctx = canvasRef.current.getContext('2d');
  if (!ctx) return;

  // 원본 이미지의 크기
  const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
  const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

  // 크롭된 이미지의 크기와 위치
  const cropWidth = completedCrop.width * scaleX;
  const cropHeight = completedCrop.height * scaleY;
  const cropX = completedCrop.x * scaleX;
  const cropY = completedCrop.y * scaleY;

  // 캔버스 크기 설정
  canvasRef.current.width = cropWidth;
  canvasRef.current.height = cropHeight;

  // 배경색 설정
  ctx.fillStyle = '#FFFFFF'; // 배경을 흰색으로 채움
  ctx.fillRect(0, 0, cropWidth, cropHeight);

  // 이미지를 크롭된 부분만 캔버스에 그리기
  ctx.drawImage(
    imgRef.current,
    cropX,  // 크롭된 이미지의 시작 x 좌표
    cropY,  // 크롭된 이미지의 시작 y 좌표
    cropWidth, // 크롭된 이미지의 넓이
    cropHeight, // 크롭된 이미지의 높이
    0, 0,  // 캔버스에 그릴 위치
    cropWidth,  // 캔버스에 그릴 크기
    cropHeight  // 캔버스에 그릴 크기
  );
}, [completedCrop]);

  const handleSave = useCallback(async () => {
  if (!completedCrop) return;

  createCroppedImage();

  // Canvas에서 이미지를 Blob 형태로 변환
  canvasRef.current.toBlob(
    async (blob) => {
      if (!blob) {
        console.error('Canvas is empty');
        return;
      }

      const formData = new FormData();
      formData.append('file', blob, 'cropped-image.png');

      try {
        const response = await api.post(`/api/image?spaceId=${activeSpace.id}&title=${title}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Upload successful:', response.data);
        handleClose();
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    },
    'image/png', 1
  );
}, [completedCrop, createCroppedImage, title, handleClose, activeSpace]);

  const handleTitleChange = useCallback((e) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setTitle(value);
    }
  }, [maxLength]);

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <Title>이미지의 제목을 입력해주세요 ({title.length}/{maxLength})</Title>
          <CloseButton onClick={handleClose}>×</CloseButton>
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
        
        <BottomContainer>
          <Input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="제목을 입력하세요 (최대 20자)"
            maxLength={maxLength}
          />
          <SaveButton onClick={handleSave}>저장</SaveButton>
        </BottomContainer>

        <Canvas ref={canvasRef} />
      </ModalContent>
    </ModalOverlay>
  );
};

ImageAddModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  imageFile: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};

export default ImageAddModal;

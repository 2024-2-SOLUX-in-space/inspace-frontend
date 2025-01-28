import React, { useState, useRef, useCallback, useContext } from 'react';
import styled from 'styled-components';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { SpaceContext } from '../../context/SpaceContext';
import api from '../../api/api';

// Styled Components
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
  padding: 1.5rem;
  width: 1000px;
  height: 700px;
  margin: 0 1rem;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 640px) {
    width: 90%;
    height: 80vh;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  font-size: 1.25rem;
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

// Modal Component
const ImageAddModal = ({ isOpen, onClose, imageFile, onSave }) => {
  const maxLength = 20;
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [title, setTitle] = useState('');
  const [crop, setCrop] = useState({
    unit: 'px',
    x: 0,
    y: 0,
    width: 300,
    height: 300
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const { activeSpace } = useContext(SpaceContext); // 변경된 부분

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
      width: 300,
      height: 300
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

    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    const pixelRatio = window.devicePixelRatio;

    const cropWidth = completedCrop.width * pixelRatio * scaleX;
    const cropHeight = completedCrop.height * pixelRatio * scaleY;

    canvasRef.current.width = cropWidth;
    canvasRef.current.height = cropHeight;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, cropWidth, cropHeight);

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      imgRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      cropWidth,
      cropHeight
    );
  }, [completedCrop]);

  const handleSave = useCallback(() => {
    if (!completedCrop) return;

    createCroppedImage();

    canvasRef.current.toBlob(
      async (blob) => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        const croppedImageUrl = URL.createObjectURL(blob);
        
        // API 호출 추가
        try {
          const formData = new FormData();
          formData.append('file', blob, 'cropped-image.png');

          const response = await api.post(`/api/image?spaceId=${activeSpace.id}&title=${title}`, formData, { // 변경된 부분
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          console.log('Upload successful:', response.data);

          // onSave 콜백을 통해 부모 컴포넌트에 알림
          onSave(title, response.data.imageUrl, { // 변경된 부분: 서버에서 받은 이미지 URL 사용
            width: completedCrop.width,
            height: completedCrop.height
          });

          handleClose();
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      },
      'image/png',
      1
    );
  }, [completedCrop, createCroppedImage, onSave, title, handleClose, activeSpace]);

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

export default ImageAddModal;

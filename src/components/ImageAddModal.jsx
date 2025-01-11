import React, { useState } from 'react';
import styled from 'styled-components';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

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

// Modal Component
const ImageAddModal = ({ isOpen, onClose, imageFile, onSave }) => {
  const [title, setTitle] = useState('');
  const maxLength = 20;
  const initialCrop = {
    unit: '%',
    x: 0,
    y: 0,
    width: 100,
    height: 100
  };
  const [crop, setCrop] = useState(initialCrop);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);

  if (!isOpen) return null;

  const handleClose = () => {
    setTitle('');
    setCrop(initialCrop);
    setCroppedImageUrl(null);
    onClose();
  };

  const handleSave = () => {
    if (!croppedImageUrl) {
      onSave(title, URL.createObjectURL(imageFile));
    } else {
      onSave(title, croppedImageUrl.url, {
        width: croppedImageUrl.width,
        height: croppedImageUrl.height
      });
    }
    setTitle('');
    setCrop(initialCrop);
    setCroppedImageUrl(null);
    onClose();
  };

  const onCropComplete = async (crop, percentCrop) => {
    if (imageFile && crop.width && crop.height) {
      const croppedData = await getCroppedImg(imageFile, crop);
      setCroppedImageUrl(croppedData);
    }
  };

  const getCroppedImg = (image, crop) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const pixelRatio = window.devicePixelRatio;
          const scaleX = img.naturalWidth / img.width;
          const scaleY = img.naturalHeight / img.height;
          
          const cropWidth = crop.width * scaleX;
          const cropHeight = crop.height * scaleY;
          
          canvas.width = cropWidth;
          canvas.height = cropHeight;
          
          const ctx = canvas.getContext('2d');
          ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
          ctx.imageSmoothingQuality = 'high';

          ctx.drawImage(
            img,
            crop.x * scaleX,
            crop.y * scaleY,
            cropWidth,
            cropHeight,
            0,
            0,
            cropWidth,
            cropHeight
          );

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                console.error('Canvas is empty');
                return;
              }
              const croppedImageUrl = URL.createObjectURL(blob);
              resolve({
                url: croppedImageUrl,
                width: cropWidth,
                height: cropHeight
              });
            },
            'image/jpeg',
            1
          );
        };
      };
    });
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setTitle(value);
    }
  };

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
              onComplete={onCropComplete}
            >
              <img
                src={URL.createObjectURL(imageFile)}
                alt="크롭할 이미지"
                style={{ maxWidth: '100%' }}
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
      </ModalContent>
    </ModalOverlay>
  );
};

export default ImageAddModal;

import React, { useState } from "react";
import { FiBook, FiBookOpen } from "react-icons/fi"; 
import {
  PublicSelectionOverlay,
  PublicSelectionBackground,
  PublicSelectionContent,
  PublicSelectionHeader,
  PublicSelectionTitle,
  CloseButton,
  BackButton,
  IconContainer,
  IconWrapper,
  ConfirmButton,
} from "../styles/PublicSelectionStyle";

const PublicSelection = ({ visibility, onConfirm, onBack, onCancel }) => {
  const [selectedVisibility, setSelectedVisibility] = useState(visibility); 

  // 아이콘 클릭 핸들러
  const handleVisibilityChange = (visibility) => {
    setSelectedVisibility(visibility);
  };

  // "다음" 버튼 클릭 핸들러
  const handleNextClick = () => {
    if (selectedVisibility) {
      onConfirm(selectedVisibility); 
    } else {
      alert("공개 여부를 선택해주세요."); 
    }
  };

  return (
    <PublicSelectionOverlay>
      <PublicSelectionBackground />
      <PublicSelectionContent>
      <BackButton onClick={onBack}>←</BackButton>
      <CloseButton onClick={onCancel}>✕</CloseButton>
        <PublicSelectionHeader>
          <PublicSelectionTitle>공간의 공개 여부를 선택해주세요</PublicSelectionTitle>
        </PublicSelectionHeader>
        <IconContainer>
          <IconWrapper
            isSelected={selectedVisibility === "public"}
            onClick={() => handleVisibilityChange("public")}
          >
            <FiBookOpen size = {25} />
            <span>공개</span>
          </IconWrapper>
          <IconWrapper
            isSelected={selectedVisibility === "private"}
            onClick={() => handleVisibilityChange("private")}
          >
            <FiBook size = {25} />
            <span>비공개</span>
          </IconWrapper>
        </IconContainer>
        <ConfirmButton onClick={handleNextClick}>다음</ConfirmButton>
      </PublicSelectionContent>
    </PublicSelectionOverlay>
  );
};

export default PublicSelection;
import React from "react";
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
} from "../../styles/sidebar/PublicSelectionStyle";

const PublicSelection = ({ visibility, setVisibility, onConfirm, onBack, onCancel }) => {
  const handleNextClick = () => {
    if (visibility) {
      onConfirm(visibility);
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
            isSelected={visibility === "public"}
            onClick={() => setVisibility("public")}
          >
            <FiBookOpen size={25} />
            <span>공개</span>
          </IconWrapper>
          <IconWrapper
            isSelected={visibility === "private"}
            onClick={() => setVisibility("private")}
          >
            <FiBook size={25} />
            <span>비공개</span>
          </IconWrapper>
        </IconContainer>
        <ConfirmButton onClick={handleNextClick}>다음</ConfirmButton>
      </PublicSelectionContent>
    </PublicSelectionOverlay>
  );
};

export default PublicSelection;
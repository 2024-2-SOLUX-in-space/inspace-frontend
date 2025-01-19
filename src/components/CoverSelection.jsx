import React, { useState } from "react";
import {
  CoverSelectionOverlay,
  CoverSelectionBackground,
  CoverSelectionContainer,
  CoverSelectionHeader, 
  CoverSelectionTitle, 
  CoverSelectionSubTitle,
  CloseButton,
  CoverImageWrapper,
  CoverImage,
  ArrowButton,
  ButtonContainer, 
  SelectButton,
} from "../styles/CoverSelectionStyle";

const CoverSelection = ({ selectedCover, onClose, onSelectCover }) => {
  const covers = ["표지C.png", "표지B.png", "표지A.png"];
  const [currentIndex, setCurrentIndex] = useState(
    selectedCover ? covers.indexOf(selectedCover) : 0
  );

  // 좌우 화살표 클릭 핸들러
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? covers.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === covers.length - 1 ? 0 : prev + 1));
  };

  // "선택" 버튼 클릭 핸들러
  const handleConfirm = () => {
      onSelectCover(covers[currentIndex]); // 선택한 표지 정보 전달
  };

  return (
    <CoverSelectionOverlay>
      <CoverSelectionBackground onClick={onClose} />
      <CoverSelectionContainer>

        {/* 헤더 */}
        <CoverSelectionHeader>
          <CoverSelectionTitle>공간의 표지를 선택해 주세요!</CoverSelectionTitle>
          <CoverSelectionSubTitle>공간 표지는 선택하면 수정할 수 없으니, 신중히 골라주세요!</CoverSelectionSubTitle>
          <CloseButton onClick={onClose}>X</CloseButton>
        </CoverSelectionHeader>

        <ArrowButton className="prev" onClick={handlePrev} aria-label="이전 표지">
          ◀
        </ArrowButton>

        {/* 표지 이미지 */}
        <CoverImageWrapper>
          <CoverImage src={covers[currentIndex]} alt={`Cover ${currentIndex + 1}`} />
        </CoverImageWrapper>

        <ArrowButton className="next" onClick={handleNext} aria-label="다음 표지">
          ▶
        </ArrowButton>

        {/* 선택 버튼 */}
        <ButtonContainer>
        <SelectButton onClick={handleConfirm}>선택</SelectButton>
        </ButtonContainer>

      </CoverSelectionContainer>
    </CoverSelectionOverlay>
  );
};

export default CoverSelection;

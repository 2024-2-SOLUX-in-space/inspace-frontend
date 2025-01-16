import React, { useState } from "react";
import { FiBook, FiBookOpen } from "react-icons/fi"; // 아이콘 import
import {
  AlertContainer,
  AlertHeader,
  AlertBody,
  IconContainer,
  IconWrapper,
  AlertButton,
} from "../styles/PublicSelectionStyle";

const PublicSelection = ({ onConfirm }) => {
  const [selectedVisibility, setSelectedVisibility] = useState(null); // 공개 여부 상태

  // 아이콘 클릭 핸들러
  const handleVisibilityChange = (visibility) => {
    setSelectedVisibility(visibility);
  };

  // "다음" 버튼 클릭 핸들러
  const handleNextClick = () => {
    if (selectedVisibility) {
      onConfirm(selectedVisibility); // AddButton.jsx로 선택 정보 전달
    } else {
      alert("공개 여부를 선택해주세요."); // 선택되지 않은 경우 알림
    }
  };

  return (
    <AlertContainer>
      <AlertHeader>공간의 공개 여부를 선택해주세요</AlertHeader>
      <AlertBody>
        <IconContainer>
          <IconWrapper
            isSelected={selectedVisibility === "public"}
            onClick={() => handleVisibilityChange("public")}
          >
            <FiBookOpen />
            <span>공개</span>
          </IconWrapper>
          <IconWrapper
            isSelected={selectedVisibility === "private"}
            onClick={() => handleVisibilityChange("private")}
          >
            <FiBook />
            <span>비공개</span>
          </IconWrapper>
        </IconContainer>
      </AlertBody>
      <AlertButton onClick={handleNextClick}>다음</AlertButton>
    </AlertContainer>
  );
};

export default PublicSelection;

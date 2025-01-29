import React, { useState } from "react";
import {
  NameInputOverlay,
  NameInputBackground,
  NameInputContainer,
  NameInputHeader,
  NameInputTitle,
  CloseButton,
  BackButton,
  InputField,
  CheckboxContainer,
  CheckboxLabel,
  NextButton,
  DescriptionText,
} from "../../styles/sidebar/NameInputStyle";

const NameInput = ({ spaceName, isMainSpace, setSpaceName, setIsMainSpace, onProceed, onBack, onCancel }) => {
  const handleNext = () => {
    if (spaceName.trim() === "") {
      alert("공간 이름을 입력해주세요.");
      return;
    }
    onProceed({ spaceName, isMainSpace });
  };

  return (
    <NameInputOverlay>
      <NameInputBackground />
      <NameInputContainer >
      <BackButton onClick={onBack}>←</BackButton>
      <CloseButton onClick={onCancel}>✕</CloseButton>
        <NameInputHeader>
          <NameInputTitle>공간의 이름을 입력해주세요</NameInputTitle>
        </NameInputHeader>
        <InputField
          type="text"
          placeholder="이름을 입력하세요"
          value={spaceName}
          onChange={(e) => setSpaceName(e.target.value)}
        />
        <CheckboxContainer>
          <input
            type="checkbox"
            id="mainSpace"
            checked={isMainSpace}
            onChange={(e) => setIsMainSpace(e.target.checked)}
          />
          <CheckboxLabel htmlFor="mainSpace">대표 공간으로 설정</CheckboxLabel>
        </CheckboxContainer>
        <DescriptionText>처음으로 추가하는 공간은 대표공간으로 설정됩니다. <br />
        대표공간은 사용자의 메인에 보여집니다.</DescriptionText>
        <NextButton onClick={handleNext}>다음</NextButton>
      </NameInputContainer>
    </NameInputOverlay>
  );
};

export default NameInput;
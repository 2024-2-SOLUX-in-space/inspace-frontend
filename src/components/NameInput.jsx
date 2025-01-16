import React, { useState } from "react";
import {
  NameInputContainer,
  InputField,
  CheckboxContainer,
  CheckboxLabel,
  NextButton,
} from "../styles/NameInputStyle";

const NameInput = ({ onProceed, onCancel }) => {
  const [spaceName, setSpaceName] = useState(""); // 공간 이름
  const [isMainSpace, setIsMainSpace] = useState(false); // 대표 공간 여부

  // 다음 버튼 클릭 처리
  const handleNext = () => {
    if (spaceName.trim() === "") {
      alert("공간 이름을 입력해주세요.");
      return;
    }
    console.log("NameInput: onProceed 호출 - 공간 이름:", spaceName, "대표 공간 여부:", isMainSpace);
    onProceed({ spaceName, isMainSpace });
  };

  return (
    <NameInputContainer>
      <h2>공간 이름 입력</h2>
      <InputField
        type="text"
        placeholder="공간 이름을 입력하세요"
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
        <CheckboxLabel htmlFor="mainSpace">
          이 공간을 대표 공간으로 설정
        </CheckboxLabel>
      </CheckboxContainer>
      <NextButton onClick={handleNext}>다음</NextButton>
    </NameInputContainer>
  );
};

export default NameInput;

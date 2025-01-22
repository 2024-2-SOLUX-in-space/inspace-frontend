import React, { useState } from "react";
import styled from "styled-components";
import CoverSelection from "./CoverSelection";
import NameInput from "./NameInput";
import PublicSelection from "./PublicSelection";
import Alert from "../alert/AddTrashAlert";

const ClickedAdd = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 5px;

  background-color: ${({ isActive }) => 
    isActive ? "#ECECEC" : "transparent"};
  transition: background-color 0.2s ease-in-out;

  position: absolute;
  top: 205px; 
  left: 15px; 
  z-index: -1000; 
`;

const AddButton = ({ isAddButtonOpen, toggleAddButton }) => {
  const [currentStep, setCurrentStep] = useState(1); 
  const [selectedCover, setSelectedCover] = useState(null); 
  const [spaceName, setSpaceName] = useState(""); 
  const [isMainSpace, setIsMainSpace] = useState(false); 
  const [visibility, setVisibility] = useState(null); 
  
  const handleNextStep = (step) => {
    setCurrentStep(step);
  };

  const handleCreateSpace = () => {
    const requestData = {
      cover: selectedCover,
      name: spaceName,
      isMain: isMainSpace,
      visibility,
    };
    // **백엔드 연동** 공간 생성 요청
    setCurrentStep(5); 
  };

  return (
    <>
      {isAddButtonOpen && (
        <div>
          {currentStep === 1 && (
            <CoverSelection
              selectedCover={selectedCover}
              onSelectCover={(cover) => {
                if (cover) {
                  setSelectedCover(cover);
                  handleNextStep(2);
                }
              }}
              onClose={toggleAddButton}
            />
          )}
          {currentStep === 2 && (
            <NameInput
              spaceName={spaceName}
              isMainSpace={isMainSpace}
              setSpaceName={setSpaceName}
              setIsMainSpace={setIsMainSpace} 
              onProceed={({ spaceName, isMainSpace }) => {
                setSpaceName(spaceName);
                setIsMainSpace(isMainSpace);
                handleNextStep(3);
              }}
              onBack={() => setCurrentStep(1)}
              onCancel={() => {
                setCurrentStep(1);
                setSelectedCover(null);
                setSpaceName("");
                setIsMainSpace(false);
                setVisibility(null);
                toggleAddButton();
              }}
            />
          )}
          {currentStep === 3 && (
            <PublicSelection
              visibility={visibility}
              setVisibility = {setVisibility}
              onConfirm={(isPublic) => {
                setVisibility(isPublic);
                handleCreateSpace();
              }}
              onBack={() => setCurrentStep(2)}
              onCancel={() => {
                setCurrentStep(1);
                setSelectedCover(null);
                setSpaceName("");
                setIsMainSpace(false);
                setVisibility(null);
                toggleAddButton();
              }}
            />
          )}
          {currentStep === 5 && (
            <Alert
              isOpen={true}
              message="공간이 추가되었습니다!"
              onClose={() => {
                setCurrentStep(1);
                setSelectedCover(null);
                setSpaceName("");
                setIsMainSpace(false);
                setVisibility(null);
                toggleAddButton();
              }}
              onConfirm={() => console.log("공간 편집 페이지로 이동")} 
              confirmText="확인"
            />
          )}
        </div>
      )}
    </>
  );
};

export default AddButton;
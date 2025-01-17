import React, { useState } from "react";
import { ClickedAdd } from "../styles/AddButtonStyle";
import CoverSelection from "./CoverSelection";
import NameInput from "./NameInput";
import PublicSelection from "./PublicSelection";
import AddAlert from "./AddAlert";

  const AddButton = ( { isAddButtonOpen, toggleAddButton }) => {
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
      setCurrentStep(5); // 최종 단계로 이동
    };
  
    return (
      <>
        <ClickedAdd isActive = {isAddButtonOpen} onClick = {toggleAddButton} />

        {isAddButtonOpen && (
          <div>
            {currentStep === 1 && (
              <CoverSelection
                onSelectCover = {(cover) => {
                  if (cover) {
                    setSelectedCover(cover);
                    handleNextStep(2);
                  } 
                }}
                onClose = { () => {
                  toggleAddButton();
                }}
              />
            )}
            {currentStep === 2 && (
              <NameInput
                onProceed={( { spaceName, isMainSpace }) => {
                  setSpaceName(spaceName);
                  setIsMainSpace(isMainSpace);
                  handleNextStep(3);
                }}
                onBack = { () => setCurrentStep(1) }
                onCancel = { () => {
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
                onConfirm={(isPublic) => {
                  setVisibility(isPublic);
                  handleCreateSpace();
                }}
                onBack = {() => setCurrentStep(2)}
                onCancel = { () => {
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
              <AddAlert
              isOpen={true}
              message="공간이 추가되었습니다!"
              onClose={() => {
                console.log("AddButton: Alert 창 닫기");
  
                setCurrentStep(1);
                setSelectedCover(null);
                setSpaceName("");
                setIsMainSpace(false);
                setVisibility(null);
  
                toggleAddButton(); // AddButton 닫기
              }}
              onConfirm={() => {
                console.log("공간 편집 페이지로 이동"); // **백엔드 연동** 페이지 전환
              }}
              confirmText="확인"
            />          
            )}
          </div>
        )}
      </>
    );
  };

export default AddButton;
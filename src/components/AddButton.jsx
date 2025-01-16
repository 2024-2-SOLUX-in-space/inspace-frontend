import React, { useState } from "react";
import CoverSelection from "./CoverSelection";
import NameInput from "./NameInput";
import PublicSelection from "./PublicSelection";
import Alert from "./Alert";

const AddButton = ( {isAddButtonOpen, toggleAddButton }) => {
  const [currentStep, setCurrentStep] = useState(1); 
  const [selectedCover, setSelectedCover] = useState(null); 
  const [spaceName, setSpaceName] = useState(""); 
  const [isMainSpace, setIsMainSpace] = useState(false); 
  const [visibility, setVisibility] = useState(null); 

  const handleNextStep = (step) => {
    console.log("AddButton: currentStep 변경 전: ", currentStep);
    setCurrentStep(step);
    console.log("AddButton: currentStep 변경 후: ", step);
  };

  const handleCreateSpace = () => {
    const requestData = {
      cover: selectedCover,
      name: spaceName,
      isMain: isMainSpace,
      visibility,
    };

    // **백엔드 연동** 공간 생성 요청
    console.log("공간 생성 데이터:", requestData);
    setCurrentStep(5); // 최종 단계로 이동
  };

  return (
    <>
      {isAddButtonOpen && (
        <div>
          {currentStep === 1 && (
            <CoverSelection
              onSelectCover = {(cover) => {
                console.log("AddButton: 수신한 표지 정보:", cover); 
                if (cover) {
                  setSelectedCover(cover);
                  handleNextStep(2);
                } else {
                  console.error ("AddButton: 표지 정보가 유효하지 않음");
                }
              }}
              onClose = { () => {
                console.log("AddButton: CoverSelection 닫기 요청")
              }}
            />
          )}
          {currentStep === 2 && (
            <>
              {console.log("AddButton: NameInput 렌더링 중")}
            <NameInput
              onProceed={( { spaceName, isMainSpace }) => {
                console.log("AddButton: NameInput에서 받은 값 - 이름:", spaceName, "대표 공간 여부:", isMainSpace)
                setSpaceName(spaceName);
                setIsMainSpace(isMainSpace);
                handleNextStep(3);
              }}
            />
            </>
          )}
          {currentStep === 3 && (
            <PublicSelection
              onConfirm={(isPublic) => {
                setVisibility(isPublic);
                handleCreateSpace();
              }}
            />
          )}
          {currentStep === 5 && (
            <Alert
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
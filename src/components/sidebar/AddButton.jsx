import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios"; // axios 추가 
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
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가 
  
  const handleNextStep = (step) => {
    setCurrentStep(step);
  };

  const handleCreateSpace = async () => { // async 
    const requestData = {
      cover: selectedCover,
      name: spaceName,
      isMain: isMainSpace,
      visibility,
    };

    console.log("전송 데이터:", requestData);

    const accessToken = localStorage.getItem("accessToken");

    // **백엔드 연동** 공간 생성 요청
    setIsLoading(true); // 로딩 시작
    try {
      const response = await axios.post("http://3.35.10.158:8080/api/spaces",  
        requestData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('공간 생성 성공:', response.data);
      setCurrentStep(5); // 성공
    } catch (error) {
      console.error('공간 생성 실패:', error);
      alert('공간 생성에 실패했어요. 다시 시도해주세요.');
    } finally {
      setIsLoading(false); // 로딩 종료
    }

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
import React, { useState } from "react";
import styled from "styled-components";
import CoverSelection from "./CoverSelection";
import NameInput from "./NameInput";
import PublicSelection from "./PublicSelection";
import Alert from "../alert/AddTrashAlert";
import api from '../../api/api.js';

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
  const [sthumb, setSthumb] = useState(null); 
  const [sname, setSname] = useState(""); 
  const [isPrimary, setIsPrimary] = useState(false); 
  const [isPublic, setIsPublic] = useState(null); 
  const [isLoading, setIsLoading] = useState(false); 
  
  const handleNextStep = (step) => {
    setCurrentStep(step);
  };

  const handleCreateSpace = async () => { 
    const requestData = {
      spaceId: 0,
      sname,
      sthumb,
      isPrimary,
      isPublic,
      createdAt: new Date().toISOString(), 
    };

// 🛠 상태 확인 로그 추가
console.log("API 호출 직전 전송 데이터:", JSON.stringify(requestData, null, 2));
console.log("현재 stumb 값:", sthumb);

  if (!sname || sthumb === null || typeof sthumb !== "number") {
    alert("유효한 썸네일 ID와 공간 이름을 입력해주세요!");
    return;
  }

    // **백엔드 연동** 공간 생성 요청
    setIsLoading(true);
    try {
      const response = await api.post(
        "/api/spaces",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("공간 생성 성공:", response.data);
      setCurrentStep(5);
    } catch (error) {
      console.error("공간 생성 실패:", error);

      if (error.response) {
        console.error("서버 응답:", error.response.data);
        alert(error.response.data.message || "공간 생성에 실패했습니다. 다시 시도해주세요.");
      } else {
        alert("공간 생성에 실패했어요. 다시 시도해주세요.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isAddButtonOpen && (
        <div>
          {currentStep === 1 && (
            <CoverSelection
              selectedCover={sthumb}
              onSelectCover={(cover) => {
                console.log("선택된 커버 ID:", cover); // ✅ 선택 값 확인
                if (typeof cover === "number" && cover >= 0) {
                  setSthumb(cover); // ✅ 상태 업데이트
                  console.log("설정된 썸네일 ID:", cover); // ✅ 상태 확인
                  handleNextStep(2); // 다음 단계로 이동
                } else {
                  alert("유효한 썸네일을 선택해주세요!"); // 잘못된 경우 경고
                }
              }}          
              onClose={toggleAddButton}
            />
          )}
          {currentStep === 2 && (
            <NameInput
              spaceName={sname}
              isMainSpace={isPrimary}
              setSpaceName={setSname}
              setIsMainSpace={setIsPrimary} 
              onProceed={({ spaceName, isMainSpace }) => {
                setSname(spaceName);
                setIsPrimary(isMainSpace);
                handleNextStep(3);
              }}
              onBack={() => setCurrentStep(1)}
              onCancel={() => {
                setCurrentStep(1);
                setSthumb(null);
                setSname("");
                setIsPrimary(false);
                setIsPublic(null);
                toggleAddButton();
              }}
            />
          )}
          {currentStep === 3 && (
            <PublicSelection
              visibility={isPublic}
              setVisibility = {setIsPublic}
              onConfirm={(isPublic) => {
                setIsPublic(isPublic);
                handleCreateSpace(); 
              }}
              onBack={() => setCurrentStep(2)}
              onCancel={() => {
                setCurrentStep(1);
                setSthumb(null);
                setSname("");
                setIsPrimary(false);
                setIsPublic(null);
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
                setSthumb(null);
                setSname("");
                setIsPrimary(false);
                setIsPublic(null);
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
import React, { useState } from "react";
import NameInput from "./NameInput";
import CoverSelection from "./CoverSelection";
import PublicSelection from "./PublicSelection";
import Alert from "../alert/AddTrashAlert";
import api from '../../api/api.js';
import { useDispatch } from 'react-redux';
import { addSpace } from '../../redux/actions/spaceActions';

const AddButton = ({ isAddButtonOpen, toggleAddButton }) => {
  const dispatch = useDispatch();
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

    if (!sname || sthumb === null || typeof sthumb !== "number") {
      alert("유효한 썸네일 ID와 공간 이름을 입력해주세요!");
      return;
    }

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
      console.log(response.data);
      const newSpace = {
        id: response.data.spaceId,
        title: response.data.sname,
        coverType: response.data.sthumb,
        isPrimary: response.data.isPrimary,
        isPublic: response.data.isPublic,
      };
      dispatch(addSpace(newSpace));
      setCurrentStep(5);
    } catch (error) {

      if (error.response) {
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
                if (typeof cover === "number" && cover >= 0) {
                  setSthumb(cover); 
                  handleNextStep(2); 
                } else {
                  alert("유효한 썸네일을 선택해주세요!"); 
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
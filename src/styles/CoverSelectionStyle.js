import styled from "styled-components";

/* 공통 알림창 오버레이 */
export const CoverSelectionOverlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

/* 공통 알림창 배경 */
export const CoverSelectionBackground = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 75px;
  right: 0;
  bottom: 0;
`;

/* 알림창 컨테이너 */
export const CoverSelectionContainer = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 0.3rem;
  width: 500px;
  height: 350px;
  position: relative;
  z-index: 10;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/* 알림창 헤더 */
export const CoverSelectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
  
`;

/* 알림창 제목 */
export const CoverSelectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  position: absolute;
  top: 20px;
  text-align: center;
  margin: 0;
`;

/* 알림창 부제목 */
export const CoverSelectionSubTitle = styled.h1`
  font-size: 0.85rem;
  font-weight: 500;
  position: absolute;
  top: 55px;
  text-align: center;
`;

/* 닫기 버튼 */
export const CloseButton = styled.button`
  position: absolute;
  background: none;
  border: none;
  top: 0.75rem;
  right: 0.75rem;
  color: black;
  font-size: 1.25rem;
  cursor: pointer;
  &:hover {
    color: #555;
  }
`;

/* 표지 이미지 컨테이너 */
export const CoverImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 450px;
  position: relative;
  top: 17px;
  margin-top: 30px;
`;

/* 표지 이미지 */
export const CoverImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease-in-out;
  top: 20px;
`;

/* 좌우 화살표 */
export const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  z-index: 100;
  outline: none;
  &:focus{
    outline: none;
  }

  &.prev {
    left: 25px;
  }

  &.next {
    right: 25px;
  }
`;

/* 버튼 컨테이너 */
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 25px;
  padding-bottom: 5px;
  width: 100%;
  margin: 8px;
`;

/* 선택 버튼 */
export const SelectButton = styled.button`
  width: auto;
  padding: 0.5rem 1rem;
  background-color: #171717;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;
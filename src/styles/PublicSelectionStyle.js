import styled from "styled-components";

export const AlertContainer = styled.div`
  width: 400px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const AlertHeader = styled.h2`
  font-size: 18px;
  margin-bottom: 20px;
`;

export const AlertBody = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 20px;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  color: ${(props) => (props.isSelected ? "#000000" : "#bdbdbd")}; // 선택 상태에 따른 색상 변경
  transition: color 0.3s;

  & > span {
    margin-top: 8px;
    font-size: 14px;
  }
`;

export const AlertButton = styled.button`
  background-color: #000000;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #333333;
  }
`;

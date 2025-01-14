import styled from "styled-components";

export const SwitchButton = styled.div`
  cursor: pointer;
  display: flex;
  margin-right: 3px; /* 책 ~ 쓰레기통 */
  font-size: 17px;
  align-items: center;
  justify-content: center;
  padding: 5px;

  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s ease-in-out;
  }
`;

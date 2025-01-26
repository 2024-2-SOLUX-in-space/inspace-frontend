import styled from 'styled-components';

/* 공간 목록 창 */
export const ArchiveList = styled.div`
  position: fixed;
  top: 15%;
  left: 100px;
  width: 280px;
  height: 300px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 900;
  color: black;
  padding: 8px;

  /* 스크롤 */
  max-height: ${({ isScrollable }) => (isScrollable ? '300px' : 'auto')};
  overflow-y: ${({ isScrollable }) => (isScrollable ? 'auto' : 'hidden')};

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #e0e0e0;
    border-radius: 50px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #bdbdbd;
  }
`;

/* 목록 속 개별 공간 */
export const ListBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 1px;
  margin: 0px;
  cursor: pointer;
  border-bottom: 1px solid #ececec;
  background-color: ${({ isSelected }) => (isSelected ? '#ECECEC' : 'white')};

  &:hover {
    background-color: #ececec;
  }
`;

/* 아이콘, 제목 너비 조정 */
export const TitleContainer = styled.span`
  flex-grow: 1;
  text-align: left;
  margin: 0 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 15px;
`;

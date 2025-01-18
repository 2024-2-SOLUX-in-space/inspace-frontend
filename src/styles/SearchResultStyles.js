import styled from 'styled-components';

export const SearchResultContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const FixedSearchBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: white;
  border-bottom: 1px solid #ffffff;
  padding: 10px;
`;

export const HashtagContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  padding: 110px 20px 10px;
`;

export const Hashtag = styled.button`
  background-color: ${(props) => (props.active ? '#000' : '#ccc')};
  color: ${(props) => (props.active ? '#fff' : '#666')};
  border: none;
  border-radius: 20px;
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.active ? '#333' : '#ddd')};
  }
`;

export const CenteredImage = styled.img`
  flex: 1;
  width: 100%;
  object-fit: cover;
  border-radius: 0;
`;

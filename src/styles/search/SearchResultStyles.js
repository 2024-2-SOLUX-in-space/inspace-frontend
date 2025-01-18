import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

export const SearchResultContainer = styled.div`
  position: relative;
`;

export const HashtagContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px 20px;
  background: white;
  min-height: 60px;
  margin-top: 8vh;
`;

export const Hashtag = styled.div`
  cursor: pointer;
  padding: 5px 8px;
  border-radius: 15px;
  background-color: ${(props) => (props.active ? 'black' : '#F5F5F5')};
  color: ${(props) => (props.active ? 'white' : 'black')};
  display: flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
  font-size: 0.9rem;
`;

export const FixedSearchBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  padding: 0.5% 1%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 8vh;
`;

export const MasonryGrid = styled.div`
  column-count: 5;
  column-gap: 10px;
  margin-top: 7vh;
  padding: 0 20px;
  width: 100%;
`;

export const GridItem = styled.div`
  break-inside: avoid;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const DetailView = styled.div`
  position: fixed;
  right: 0;
  top: 90px;
  height: ${(props) => (props.fullscreen ? '100%' : '100vh')};
  width: ${(props) => (props.fullscreen ? '100%' : '40%')};
  background: white;
  padding: 20px;
  z-index: 100;
  transform: ${(props) =>
    props.visible ? 'translateX(0)' : 'translateX(100%)'};
  transition:
    transform 0.3s ease-in-out,
    width 0.3s ease,
    height 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  .image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .user-info {
    position: fixed;
    top: 50px;
    left: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    font-size: 1.5rem;
    color: black;
  }

  .title {
    font-size: 2rem;
    color: black;
  }

  img {
    max-width: 40%;
    border-radius: 10px;
  }

  .add-button {
    padding: 10px 20px;
    background: black;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    width: 15%;
    font-size: 1.2rem;
    position: fixed;
    bottom: 20px;
    right: 20px;
  }
`;

export const CloseButton = styled(FaTimes)`
  position: absolute;
  top: 10px;
  right: 40px;
  cursor: pointer;
`;

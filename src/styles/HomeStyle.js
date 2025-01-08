import styled from 'styled-components';

export const HomeContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: ${(props) =>
    props.isEditOpen
      ? "url('/background.png')"
      : "url('/home_background.png')"};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const ContentWrapper = styled.div`
  position: relative;
  width: 950px;
  height: 858px;
`;

export const EditButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 5px;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 150px;
  cursor: pointer;
  outline: none;

  &:focus {
    outline: none;
  }
`;

import styled from 'styled-components';

export const SidebarContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 420px;
  height: 100vh;
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transform: translateX(${(props) => (props.isOpen ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  transition:
    transform 0.3s ease-in-out,
    visibility 0.3s ease-in-out;
`;

export const SidebarContent = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px 0;
`;

export const DraggableContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.isStickers ? 'repeat(2, 1fr)' : '1fr'};
  gap: 10px;
  padding: 20px;
  overflow-y: auto;
`;

export const DraggableItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

export const StyledImage = styled.img`
  width: 90%;
  height: auto;
  object-fit: contain;
  cursor: pointer;
`;

export const IconContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  padding: 20px;
  margin-top: auto;
  margin-bottom: 20px;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 20%;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: #f5f5f5;
    }
  }

  svg {
    width: 40px;
    height: 40px;
    cursor: pointer;
    color: #b3b3b3;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: #000000;
    }

    ${(props) =>
      props.selected &&
      `
      color: #000000;
    `}
  }
`;

import styled from 'styled-components';

export const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100%;
  background-color: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transform: translateX(${(props) => (props.isOpen ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
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
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px;
  margin: 0 20px;
  overflow-y: auto;
  flex: 0 auto;
`;

export const DraggableItem = styled.div`
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`;

export const StyledImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  user-select: none;
`;

export const EditIcons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  width: 100%;
  padding: 0 20px;
  margin-top: auto;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  transform: translateY(-20px);

  img {
    width: 36px;
    height: 36px;
  }

  &:hover {
    background-color: #f5f5f5;
    border-color: #f5f5f5;
  }

  &:focus {
    outline: none;
  }
`;

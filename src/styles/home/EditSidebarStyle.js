import styled from 'styled-components';

export const SidebarContainer = styled.div`
  position: absolute;
  right: 0;
  top: 7.3vh;
  width: 300px;
  height: 92.7vh;
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transform: translateX(${(props) => (props.isOpen ? '0' : '100%')});
  transition:
    transform 0.3s ease-in-out,
    visibility 0.3s ease-in-out;
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
`;

export const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 65px);
  overflow-y: auto;
`;

export const DraggableContainer = styled.div`
  display: ${(props) => (props.isStickers ? 'grid' : 'flex')};
  grid-template-columns: ${(props) =>
    props.isStickers ? 'repeat(2, 1fr)' : 'none'};
  flex-direction: ${(props) => (props.isStickers ? 'unset' : 'column')};
  gap: 10px;
  padding: 10px;
  flex: 1;
  overflow-y: auto;
  min-height: 0;
`;

export const DraggableItem = styled.div`
  width: ${(props) => (props.isSticker ? '100px' : '80%')};
  height: ${(props) => (props.isSticker ? '100px' : 'auto')};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  position: relative;
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  max-width: 100%;
  cursor: pointer;
`;

export const IconContainer = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #eee;
  background-color: white;
  padding: 20px 10px;
  overflow-x: hidden;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease-in-out;
    color: #000000;

    &:hover {
      background-color: #ececec;
      border-radius: 5px;
    }
  }

  svg {
    width: 40px;
    height: 40px;
    cursor: pointer;
    color: #000000;
    padding: 5px;

    ${(props) =>
      props.selected &&
      `
      background-color: #ececec;
      border-radius: 5px;
    `}
  }
`;

export const AddButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
  margin-top: auto;
  margin-bottom: 20px;
  position: absolute;
  bottom: 65px;
  right: 10px;
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 16px;
  background-color: #111827;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #1f2937;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: transparent;
  border: 2px solid #000000;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #000000;
    color: white;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

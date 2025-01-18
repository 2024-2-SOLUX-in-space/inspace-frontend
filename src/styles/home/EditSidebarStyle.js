import styled from 'styled-components';

export const SidebarContainer = styled.div`
  position: absolute;
  right: 0;
  top: 70px;
  width: 400px;
  height: 93vh;
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
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
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
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

export const StyledImage = styled.img`
  width: ${(props) => {
    if (props.isSticker) return '150px';
    return props.width ? `${props.width}px` : 'auto';
  }};
  height: ${(props) => {
    if (props.isSticker) return '150px';
    return props.height ? `${props.height}px` : 'auto';
  }};
  object-fit: contain;
  max-width: 100%;
  cursor: pointer;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 15px 10px;
  border-top: 1px solid #eee;

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

export const AddButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
  margin-top: auto;
  margin-bottom: 20px;
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
  top: -10px;
  right: -10px;
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

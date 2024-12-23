import React from 'react';
import styled from 'styled-components';

const EditSidebar = ({ isOpen, onClose }) => {

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarContent>
        <EditIcons>
          <IconButton>
            <img src="/icon_file.png" alt="파일" />
          </IconButton>
          <IconButton>
            <img src="/icon_youtube.png" alt="유튜브" />
          </IconButton>
          <IconButton>
            <img src="/icon_music.png" alt="음악" />
          </IconButton>
          <IconButton>
            <img src="/icon_sticker.png" alt="스티커" />
          </IconButton>
        </EditIcons>
      </SidebarContent>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  right: ${(props) => (props.isOpen ? '0' : '-350px')};
  width: 400px;
  height: 100%;
  background-color: white;
  transition: right 0.3s ease-in-out;
  box-shadow: ${(props) => (props.isOpen ? '-2px 0 10px rgba(0, 0, 0, 0.1)' : 'none')};
  z-index: 1000;
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
  transition: all 0.3s ease-in-out;
`;

const SidebarContent = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 20px;
`;

const EditIcons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  width: 100%;
  padding: 0 20px;
`;

const IconButton = styled.button`
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

export default EditSidebar;

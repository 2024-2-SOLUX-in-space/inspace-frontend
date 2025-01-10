import styled from 'styled-components';

export const ArchiveContainer = styled.div.attrs((props) => {
  return {
    'aria-hidden': !props.isOpen,
  };
})`
  display: block !important;
  position: fixed;
  top: 20%;
  left: 20%;
  width: 60%;
  height: 60%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 2000;
  color: black;
`;

import styled from 'styled-components';
import { FiHeart } from 'react-icons/fi';

const NotificationContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  width: 100%;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 8px;
  width: 100%;
  font-size: 12px;
  color: #666;
`;

const Username = styled.span`
  font-weight: 500;
  color: #333;
  font-size: 16px;
  white-space: nowrap;
`;

const Message = styled.span`
  color: #666;
  font-size: 16px;
  white-space: nowrap;
`;

const Heart = styled.span`
  color: #ff4b4b;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-left: 4px;
`;

const Notification = ({ username, action }) => {
  return (
    <NotificationContainer>
      <Content>
        <Username>{username}</Username>
        <Message>{action}</Message>
        <Heart>
          <FiHeart size={16} fill='red' />
        </Heart>
      </Content>
    </NotificationContainer>
  );
};

export default Notification;

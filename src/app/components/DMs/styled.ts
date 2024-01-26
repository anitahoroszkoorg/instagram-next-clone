import styled from "styled-components";
import { keyframes } from "styled-components";

export const RecentsTitle = styled.p`
  font-size: 15px;
  color: #616771;
  padding: 10px;
`;

const itemAnimation = keyframes`
0% {
    transform: translateX(0);
}

100% {
    transform: translateX(5px);
}
`;

const clickItemAnimation = keyframes`
0% {
    transform: scale(1);
}

50% {
    transform: scale(1.1);
}

100% {
    transform: scale(1);
}
`;

export const UserAvatar = styled.img`
  border-radius: 50%;
  height: 30px;
  width: 30px;
  padding: 5px;
`;

export const MessageList = styled.div`
  width: 30vw;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  display: flex;
  flex-direction: column;
`;

export const MessageItem = styled.div`
  margin-top: 1px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 30vw;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  height: 70px;
  &:hover {
    animation-name: ${itemAnimation};
    animation-duration: 1s;
    animation-iteration-count: 1;
    cursor: pointer;
  }
  display: flex;
  &:active {
    animation-name: ${clickItemAnimation};
    animation-duration: 1s;
    animation-iteration-count: 1;
  }
`;

interface MessageItemTextProps {
  read: boolean;
}

export const MessageItemText = styled.p<MessageItemTextProps>`
  padding: 5px;
  color: ${({ read }) => (read ? "lightgrey" : "black")};
`;

export const CreateMessage = styled.div``;

export const InputMessage = styled.input``;

export const SendButton = styled.button``;

export const Recents = styled.div`
  width: 30vw;
  height: 100vh;
  border-radius: 10px;
`;

export const Messenger = styled.div`
  border-radius: 10px;
  height: 100%;
  width: 70vw;
  display: flex;
  flex-direction: column;
`;

export const Incoming = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background: rgb(255, 0, 181);
  background: linear-gradient(
    90deg,
    rgba(255, 0, 181, 1) 0%,
    rgba(132, 29, 180, 1) 44%,
    rgba(0, 108, 255, 1) 100%
  );
  width: 30%;
  color: white;
  height: 100%x;
  border-radius: 20px;
  padding: 8px;
  margin: 15px 0px 20px 20px;
  word-wrap: break-word;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
`;

export const Outgoing = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  background: lightgrey;
  width: 30%;
  color: white;
  height: 100%x;
  border-radius: 20px;
  padding: 8px;
  margin: 15px 0px 20px 20px;
  word-wrap: break-word;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
`;

export const MessengerBubble = styled.div`
  background: rgb(255, 0, 181);
  background: linear-gradient(
    90deg,
    rgba(255, 0, 181, 1) 0%,
    rgba(132, 29, 180, 1) 44%,
    rgba(0, 108, 255, 1) 100%
  );
  width: 30%;
  color: white;
  height: 100%x;
  border-radius: 20px;
  padding: 8px;
  margin: 15px 0px 20px 20px;
  word-wrap: break-word;
`;

export const MyMessageBubble = styled.div`
  background: lightgrey;
  width: 30%;
  color: white;
  height: 100%x;
  border-radius: 20px;
  padding: 8px;
  margin: 15px 0px 20px 20px;
  word-wrap: break-word;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 100vh;
`;

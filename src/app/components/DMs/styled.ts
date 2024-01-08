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
    transform: translateX(50px);
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
`;

export const MessageList = styled.div`
  width: 30vw;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  display: flex;
  flex-direction: column;
`;

export const MessageItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 30vw;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  height: 40px;
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

export const CreateMessage = styled.div``;

export const InputMessage = styled.input``;

export const SendButton = styled.button``;

export const Recents = styled.div`
  width: 30vw;
  height: 100vh;
  background-color: #e9ebee;
  border-radius: 10px;
`;

export const Messenger = styled.div`
  border-radius: 10px;
  height: 100%;
  width: 70vw;
`;

export const Wrapper = styled.div`
display: flex;
flex-direction: row;
align-items: flex-start;
height: 100vh;
`
import styled, { keyframes } from "styled-components";

const commonBoxShadow = "rgba(149, 157, 165, 0.2) 0px 8px 24px";

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

export const RecentsTitle = styled.p`
  font-size: 12px;
  color: #616771;
  padding: 10px;
`;

export const DateStamp = styled.p`
  font-size: 12px;
  color: #616771;
  padding: 10px;
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
  box-shadow: ${commonBoxShadow};
  display: flex;
  flex-direction: column;
  border-right: 1px solid darkgrey;
  overflow-y: scroll;
  height: 80vh;
`;

export const MessageItem = styled.div`
  margin-top: 1px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 30vw;
  border-radius: 10px;
  box-shadow: ${commonBoxShadow};
  height: 70px;
  &:hover {
    animation: ${itemAnimation} 1s 1;
    cursor: pointer;
  }
  &:active {
    animation: ${clickItemAnimation} 1s 1;
  }
`;

interface MessageItemTextProps {
  read: boolean;
}

export const MessageItemText = styled.p<MessageItemTextProps>`
  padding: 5px;
  color: ${({ read }) => (read ? "lightgrey" : "black")};
  margin-right: 10px;
`;

export const CreateMessage = styled.div`
  position: relative;
  width: 70vw;
`;

const commonInputStyle = `
  border: 1px solid darkgrey;
  border-radius: 5px;
`;

export const InputMessage = styled.input`
  ${commonInputStyle}
  width: 65vw;
  height: 30px;
  padding: 5px;
  margin: 15px;
  position: fixed;
  right: 3rem;
  top: 50%;
  transform: translateY(-50%);
  right: 3rem;
  top: 50%;
  transform: translateY(-50%);
`;

export const SendButton = styled.button`
  position: absolute;
  right: 3rem;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const Recents = styled.div`
  width: 30vw;
  height: 100vh;
  border-radius: 10px;
`;

const commonMessengerStyles = `
  border-radius: 10px;
  width: 70vw;
  display: flex;
`;

export const Messenger = styled.div`
  ${commonMessengerStyles}
  height: 80vh;
  flex-direction: column;
  margin-top: 2rem;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const commonBubbleStyles = `
  width: 30%;
  color: white;
  border-radius: 20px;
  padding: 10px;
  margin: 15px 0px 20px 20px;
  word-wrap: break-word;
  display: flex;
  justify-content: center;
`;

export const Incoming = styled.div`
  ${commonBubbleStyles}
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    90deg,
    rgba(255, 0, 181, 1) 0%,
    rgba(132, 29, 180, 1) 44%,
    rgba(0, 108, 255, 1) 100%
  );
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
`;

export const Outgoing = styled.div`
  ${commonBubbleStyles}
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  background: lightgrey;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  height: 100vh;
`;

export const ActiveLog = styled.div`
  display: flex;
  width: 70vw;
  height: 5vh;
  border: 1px solid black;
`;

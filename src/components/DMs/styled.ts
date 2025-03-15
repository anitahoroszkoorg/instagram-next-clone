import styled, { keyframes } from "styled-components";

const commonBoxShadow = "rgba(149, 157, 165, 0.2) 0px 0.5em 1.5em";

const itemAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(0.3em);
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
  font-size: 0.75em;
  color: #616771;
  padding: 0.6em;
`;

export const DateStamp = styled.p`
  font-size: 0.75em;
  color: #616771;
  margin-left: 0.6em;
`;

export const UserAvatar = styled.img`
  border-radius: 50%;
  height: 2em;
  width: 2em;
  padding: 0.3em;
  object-fit: cover;
`;

export const MessageList = styled.div`
  width: 30vw;
  border-radius: 0.6em;
  box-shadow: ${commonBoxShadow};
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 80vh;
`;

export const MessageItem = styled.div<MessageItemTextProps>`
  margin-top: 0.06em;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 28vw;
  border-radius: 0.6em;
  box-shadow: ${commonBoxShadow};
  height: 4.4em;
  &:hover {
    animation: ${itemAnimation} 1s 1;
    cursor: pointer;
  }
  &:active {
    animation: ${clickItemAnimation} 1s 1;
  }
  border: ${({ picked }) => (picked ? "0.06em solid lightblue" : "none")};
`;

interface MessageItemTextProps {
  read?: boolean;
  picked?: boolean;
}

export const MessageItemText = styled.p<MessageItemTextProps>`
  padding: 0.3em;
  color: ${({ read }) => (read ? "lightgrey" : "black")};
  margin-right: 0.6em;
`;

export const CreateMessage = styled.div`
  position: relative;
  width: 70vw;
`;

const commonInputStyle = `
  border: 0.06em solid darkgrey;
  border-radius: 0.3em;
`;

export const InputMessage = styled.input`
  ${commonInputStyle}
  width: 65vw;
  height: 10vh;
  padding: 0.3em;
  position: fixed;
  right: 3rem;
  top: 90%;
  transform: translateY(-50%);
`;

export const SendButton = styled.button`
  position: fixed;
  right: 4rem;
  top: 90%;
  transform: translateY(-50%);
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const Recents = styled.div`
  width: 30vw;
  border-radius: 0.6em;
`;

export const Messenger = styled.div`
  flex-direction: column;
  margin-top: 2rem;
  overflow-x: hidden;
  overflow-y: scroll;
  border-radius: 0.6em;
  width: 70vw;
  display: flex;
  height: 65vh;
`;

const commonBubbleStyles = `
  color: white;
  border-radius: 1.25em;
  padding: 0.6em 0.6em;
  margin: 0.9em 0em 0.6em 1.25em;
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
    rgba(0, 0, 0, 0.1) 0px 0.6em 0.9em -0.18em,
    rgba(0, 0, 0, 0.05) 0px 0.25em 0.4em -0.12em;
  width: 15.5em;
`;

export const Outgoing = styled.div`
  ${commonBubbleStyles}
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background: lightgrey;
  width: 15.5em;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  height: 100vh;
`;

export const ColumnOne = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
export const ColumnTwo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 6vw;
`;

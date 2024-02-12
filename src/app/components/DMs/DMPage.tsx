import React from "react";
import {
  Recents,
  MessageList,
  MessageItem,
  CreateMessage,
  InputMessage,
  SendButton,
  RecentsTitle,
  UserAvatar,
  Messenger,
  Wrapper,
  Incoming,
  Outgoing,
  MessageItemText,
  DateStamp,
} from "./styled";
import SendIcon from "@mui/icons-material/Send";

interface Message {
  id: number;
  text: string;
  sender: string;
  read: boolean;
  avatar?: string;
}

const DMPage: React.FC = () => {
  const messages: Message[] = [
    {
      id: 1,
      text: "hello",
      sender: "user1",
      read: false,
      avatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      text: "hi",
      sender: "user2",
      read: false,
      avatar:
        "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      text: "how are you",
      sender: "user3",
      read: true,
      avatar:
        "https://images.unsplash.com/photo-1502767882403-636aee14f873?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    { id: 4, text: "good", sender: "user4", read: false },
    { id: 5, text: "great", sender: "user5", read: true },
    {
      id: 6,
      text: "nice",
      sender: "user6",
      read: true,
      avatar: "https://avatars.githubusercontent.com/u/1234?v=4",
    },
    {
      id: 7,
      text: "great",
      sender: "user5",
      read: true,
      avatar:
        "https://images.unsplash.com/photo-1496360166961-10a51d5f367a?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 8,
      text: "great",
      sender: "user5",
      read: true,
      avatar:
        "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    { id: 9, text: "great", sender: "user5", read: true },
    { id: 10, text: "great", sender: "user5", read: true },
    { id: 11, text: "great", sender: "user5", read: true },
    { id: 12, text: "great", sender: "user5", read: true },
    { id: 13, text: "great", sender: "user5", read: true },
    { id: 14, text: "great", sender: "user5", read: true },
  ];

  const count = messages.filter((message) => !message.read).length;

  return (
    <Wrapper>
      <Recents>
        <RecentsTitle>Unread messages: {count}</RecentsTitle>
        <MessageList>
          {messages.map((message) => (
            <MessageItem key={message.id}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <UserAvatar
                  src={message.avatar ? message.avatar : "/avatar.jpeg"}
                />
                <p>{message.sender}</p>
              </div>
              <MessageItemText read={message.read}>
                {message.text}
              </MessageItemText>
            </MessageItem>
          ))}
        </MessageList>
      </Recents>
      <Messenger>
        <DateStamp> Friday, 20th December</DateStamp>
        <Incoming>Hello, how have you been lately?</Incoming>
        <Outgoing>
          Hi, thanks for reaching out! I lost my phone last week!!
        </Outgoing>
        <Incoming>No way, what happened!?</Incoming>
        <Outgoing>
          Oh, I just left it at the bus stop near my house, but thankfully
          someone found it
        </Outgoing>
        <Outgoing>so you can say I got pretty lucky at the end...</Outgoing>
        <Incoming>Totally, wow</Incoming>
        <CreateMessage>
          <InputMessage placeholder="Type your message" />
          <SendButton>
            <SendIcon style={{ color: "gray" }} />
          </SendButton>
        </CreateMessage>
      </Messenger>
    </Wrapper>
  );
};

export default DMPage;

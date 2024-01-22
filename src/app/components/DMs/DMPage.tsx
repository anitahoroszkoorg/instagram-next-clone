"use client";
import React, { useState, ChangeEvent } from "react";
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
  MessengerBubble,
  MyMessageBubble,
} from "./styled";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import SearchIcon from "@mui/icons-material/Search";

interface Message {
  text: string;
  sender: string;
}

const DMPage: React.FC = () => {
  // const [messages, setMessages] = useState<Message[]>([]);
  // const [message, setMessage] = useState<string>("");

  // const handleSendMessage = (): void => {
  //   if (message.trim() !== "") {
  //     const newMessage: Message = { text: message, sender: "me" };
  //     setMessages([...messages, newMessage]);
  //     setMessage("");
  //   }
  // };

  //get all messages for user
  //get all users
  //POST a message from user1 to user

  const messages = [
    { id: 1, text: "hello", sender: "user1", read: false },
    { id: 2, text: "hi", sender: "user2", read: false },
    { id: 3, text: "how are you", sender: "user3", read: true },
    { id: 4, text: "good", sender: "user4", read: false },
    { id: 5, text: "great", sender: "user5", read: true },
    {
      id: 6,
      text: "nice",
      sender: "user6",
      read: true,
      avatar: "https://avatars.githubusercontent.com/u/1234?v=4",
    },
  ];

  const count = messages.filter((message) => message.read === false).length;

  return (
    <>
      <Wrapper>
        <Recents>
          <RecentsTitle>recents: {count}</RecentsTitle>
          <MessageList>
            {messages.map((message) => (
              <MessageItem key={message.text}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <UserAvatar
                    src={message.avatar ? message.avatar : "/avatar.jpeg"}
                  />
                  <p>{message.sender}</p>
                </div>
                <p>{message.text}</p>
              </MessageItem>
            ))}
          </MessageList>
        </Recents>
        <Messenger>
          <MessengerBubble>
            Hello, how have you been? I havent heard from you in a while
          </MessengerBubble>
          <MyMessageBubble>
            Hi, thanks for reaching out! I lost my phone last week!!
          </MyMessageBubble>
          <MessengerBubble>No way, what happened!?</MessengerBubble>
        </Messenger>
      </Wrapper>
    </>
  );
};

export default DMPage;

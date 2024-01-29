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
  Incoming,
  Outgoing,
  MessageItemText,
  ActiveUsers,
} from "./styled";

interface Message {
  text: string;
  sender: string;
}

const DMPage: React.FC = () => {
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
    { id: 7, text: "great", sender: "user5", read: true },

    { id: 8, text: "great", sender: "user5", read: true },
    { id: 9, text: "great", sender: "user5", read: true },
    { id: 10, text: "great", sender: "user5", read: true },
    { id: 11, text: "great", sender: "user5", read: true },
    { id: 12, text: "great", sender: "user5", read: true },
    { id: 13, text: "great", sender: "user5", read: true },
    { id: 14, text: "great", sender: "user5", read: true },
  ];

  const count = messages.filter((message) => message.read === false).length;

  return (
    <>
      <Wrapper>
        <Recents>
          <RecentsTitle>Unread messages: {count}</RecentsTitle>
          <MessageList>
            {messages.map((message) => (
              <MessageItem key={message.text}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <UserAvatar
                    src={message.avatar ? message.avatar : "/avatar.jpeg"}
                  />
                  <p>{message.sender}</p>
                </div>
                <MessageItemText key={message.id} read={message.read}>
                  {message.text}
                </MessageItemText>
              </MessageItem>
            ))}
          </MessageList>
        </Recents>
        <Messenger>
          <div style={{ marginTop: "4rem" }}></div>
          <Incoming>
            Hello, how have you been? I havent heard from you in a while
          </Incoming>
          <Outgoing>
            Hi, thanks for reaching out! I lost my phone last week!!
          </Outgoing>
          <Incoming>No way, what happened!?</Incoming>
        </Messenger>
        <RecentsTitle>Active Friends</RecentsTitle>
        <ActiveUsers>
          {messages.map((message) => (
            <MessageItem key={message.text}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <UserAvatar
                  src={message.avatar ? message.avatar : "/avatar.jpeg"}
                />
                <p>{message.sender}</p>
              </div>
              <MessageItemText key={message.id} read={message.read}>
                {message.text}
              </MessageItemText>
            </MessageItem>
          ))}
        </ActiveUsers>
      </Wrapper>
    </>
  );
};

export default DMPage;

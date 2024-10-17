import React from "react";
import { MessageItem, UserAvatar, MessageItemText } from "./styled";
import { Message } from "@/globals";

export const MessageItemComponent: React.FC<{ message: Message }> = ({
  message,
}) => (
  <MessageItem key={message.id} picked={message.picked}>
    <div style={{ display: "flex", alignItems: "center" }}>
      <UserAvatar src={message.avatar ? message.avatar : "/avatar.jpeg"} />
      <p>{message.sender}</p>
    </div>
    <MessageItemText read={message.read}>{message.text}</MessageItemText>
  </MessageItem>
);

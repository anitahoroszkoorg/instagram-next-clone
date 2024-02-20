import React, { useMemo } from "react";
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
  ColumnOne,
  ColumnTwo,
} from "./styled";
import SendIcon from "@mui/icons-material/Send";
import { messages } from "../../utils/messages";

const DMPage: React.FC = () => {
  const count = useMemo(
    () => messages.filter((message) => !message.read).length,
    [],
  );

  return (
    <Wrapper>
      <Recents>
        <RecentsTitle>Unread messages: {count}</RecentsTitle>
        <MessageList>
          {messages.map((message) => (
            <MessageItem key={message.id} picked={message.picked}>
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
        <DateStamp>{new Date().toDateString()}</DateStamp>
        <ColumnOne>
          <Incoming>Hello, how have you been lately?</Incoming>
        </ColumnOne>
        <ColumnTwo>
          <Outgoing>
            Hi, thanks for reaching out! I lost my phone last week!!
          </Outgoing>
        </ColumnTwo>
        <ColumnOne>
          <Incoming>No way, what happened!?</Incoming>
        </ColumnOne>
        <ColumnTwo>
          <Outgoing>
            Oh, I just left it at the bus stop near my house, but thankfully
            someone found it ❤️
          </Outgoing>
        </ColumnTwo>
        <Incoming>Wow so sorry to hear that..</Incoming>
        <Incoming>anyways, are you coming today?</Incoming>
        <Incoming>do you want to go together?</Incoming>
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

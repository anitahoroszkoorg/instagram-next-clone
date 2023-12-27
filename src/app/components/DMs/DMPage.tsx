"use client";
import React, { useState, ChangeEvent } from "react";

interface Message {
  text: string;
  sender: string;
}

const DMPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const username = "anitka";

  const handleSendMessage = (): void => {
    if (message.trim() !== "") {
      const newMessage: Message = { text: message, sender: "me" };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  return (
    <div>
      <div>
        <h2>{username}</h2>
      </div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.text}</div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setMessage(e.target.value)
          }
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default DMPage;

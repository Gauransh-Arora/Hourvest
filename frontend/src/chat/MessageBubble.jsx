import React from "react";

const MessageBubble = ({ message, isMine }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isMine ? "flex-end" : "flex-start",
      }}
    >
      <div className={`message-bubble ${isMine ? "mine" : "theirs"}`}>
        <p style={{ margin: 0 }}>{message.text}</p>
      </div>
    </div>
  );
};

export default MessageBubble;
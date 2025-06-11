// src/chat/MessageBubble.jsx
import React from 'react';

const MessageBubble = ({ message, isMine }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: isMine ? 'flex-end' : 'flex-start',
      marginBottom: '0.5rem',
    }}>
      <div style={{
        background: isMine ? '#DCF8C6' : '#F1F0F0',
        padding: '8px 12px',
        borderRadius: '20px',
        maxWidth: '60%',
      }}>
        <p style={{ margin: 0 }}>{message.text}</p>
      </div>
    </div>
  );
};

export default MessageBubble;

// src/chat/ChatPage.jsx
import React, { useEffect, useState } from 'react';
import socket from './socket';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';

const ChatPage = ({ user }) => {
  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    if (user?._id) {
      socket.emit('addUser', user._id);
    }
  }, [user]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <ChatList user={user} setCurrentChat={setCurrentChat} />
      <ChatWindow user={user} currentChat={currentChat} />
    </div>
  );
};

export default ChatPage;

// src/chat/socket.js
import { io } from 'socket.io-client';

const socket = io('https://hourvest.onrender.com', {
  withCredentials: true,
});

export default socket;

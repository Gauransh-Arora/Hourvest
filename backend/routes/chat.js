const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const {
  createConversation,
  getUserConversations,
  sendMessage,
  getMessages,
} = require('../controllers/chatController');

// Create a new conversation (between 2 users)
router.post('/conversations', protect, createConversation);

// Get all conversations for logged-in user
router.get('/conversations', protect, getUserConversations);

// Send a message in a conversation
router.post('/messages', protect, sendMessage);

// Get all messages for a conversation
router.get('/messages/:conversationId', protect, getMessages);

module.exports = router;

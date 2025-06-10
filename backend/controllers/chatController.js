const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

// Create a new conversation between two users
const createConversation = async (req, res) => {
  const { receiverId } = req.body;
  const senderId = req.user.id;

  if (!receiverId) {
    return res.status(400).json({ message: 'receiverId is required' });
  }

  try {
    // Check if conversation already exists between these users
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (conversation) {
      return res.status(200).json(conversation);
    }

    // Create new conversation
    conversation = new Conversation({ members: [senderId, receiverId] });
    await conversation.save();

    res.status(201).json(conversation);
  } catch (error) {
    console.error('Error creating conversation:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all conversations for logged-in user
const getUserConversations = async (req, res) => {
  const userId = req.user.id;

  try {
    const conversations = await Conversation.find({
      members: userId,
    }).populate('members', 'username');

    res.status(200).json(conversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Send a message in a conversation
const sendMessage = async (req, res) => {
  const { conversationId, text } = req.body;
  const senderId = req.user.id;

  if (!conversationId || !text) {
    return res.status(400).json({ message: 'conversationId and text are required' });
  }

  try {
    const message = new Message({
      conversation: conversationId,
      sender: senderId,
      text,
    });

    await message.save();
    res.status(201).json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all messages for a conversation
const getMessages = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const messages = await Message.find({ conversation: conversationId }).populate('sender', 'username');
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createConversation,
  getUserConversations,
  sendMessage,
  getMessages,
};

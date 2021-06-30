const asyncHandler = require('express-async-handler');
const decodeToken = require('../utils/decodeToken');

const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

// @route POST /conversation/create/:id
// Create a conversation
exports.newConversation = asyncHandler(async (req, res) => {
  const recipient = req.params.id;
  const { type, content } = req.body;
  let decoded = decodeToken(req.cookies.token);
  const userId = decoded.id;
  console.log('testing create new conversation route...');
  try {
    const message = await Message.create({
      sender: userId,
      recipient,
      sendDate: Date.now(),
      content,
      type,
    });
    await Conversation.create({
      participants: [userId, recipient],
      messages: [message],
    });
    res.status(200).json({
      success: {
        message: {
          id: message._id,
          content: message.content,
          sendDate: message.sendDate,
          read: message.read,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({ error: 'Could not create conversation' });
  }
});

// @route POST /messages/:id
// Create a new message
exports.newMessage = asyncHandler(async (req, res) => {
  const { type, content } = req.body;
  const recipient = req.params.id;
  let decoded = decodeToken(req.cookies.token);
  const userId = decoded.id;
  try {
    const message = await Message.create({
      sender: userId,
      recipient,
      sendDate: this.createdAt(),
      content,
      type,
    });
    res.status(201).json({
      success: {
        message: {
          id: message._id,
          content: message.content,
          sendDate: message.sendDate,
          read: message.read,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({ error: 'Could not send mesage' });
  }
});

// @route GET /conversation/all
// Populate chat links with all conversations
exports.getConversations = asyncHandler(async (req, res) => {
  let decoded = decodeToken(req.cookies.token);
  const userId = decoded.id;

  try {
    const conversations = Conversation.find({ $and: [{ participants: { $in: userId } }, { deleted: false }] });
    res.status(200).json({
      success: {
        conversations,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: 'Could not get conversation' });
  }
});

// @route DELETE /conversation/delete/:id
// Delete conversation
exports.deleteConversation = asyncHandler(async (req, res) => {
  let conversationId = req.params.id;

  try {
    await Conversation.findOneAndUpdate({ _id: conversationId }, { deleted: true });
    res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Could not delete conversation' });
  }
});

// @route PATCH /messages/:id/read
// Mark all messages in a converstion as read
exports.readMessages = asyncHandler(async (req, res) => {
  const conversationId = req.params.id;
  try {
    const conversation = Conversation.findOne({ _id: conversationId }).populate('messages');
    conversation.messages.forEach((message) => {
      message.read = true;
    });
    await conversation.save();
    res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Could not mark messages in conversation as read' });
  }
});

// @route GET /conversation/show/:id
// Get a conversation with messages with a another user
exports.getConversation = asyncHandler(async (req, res) => {
  const conversationId = req.params.id;
  try {
    const conversation = Conversation.findOne({ _id: conversationId }).populate('messages');
    res.status(200).json({
      success: {
        conversation,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: 'Could not get conversation' });
  }
});

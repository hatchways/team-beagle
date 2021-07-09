const asyncHandler = require("express-async-handler");
const decodeToken = require("../utils/decodeToken");
const mongoose = require("mongoose");

const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const Profile = require("../models/Profile");

mongoose.set("useFindAndModify", false);

// @route POST /conversation/create/:id
// Create a conversation
exports.newConversation = asyncHandler(async (req, res) => {
  const recipient = req.params.id;
  const { type, content } = req.body;
  let decoded = decodeToken(req.cookies.token);
  const userId = decoded.id;
  try {
    const existingConversation = await Conversation.find({
      $and: [
        { participants: { $in: userId } },
        { participants: { $in: recipient } },
        { deleted: false },
      ],
    });
    if (existingConversation.length > 0) {
      res.status(403).json({ error: "Conversation already exists" });
    } else {
      const message = await Message.create({
        sender: userId,
        recipient,
        content,
        type,
      });
      const participantProfile1 = await Profile.findOne({ userId: userId });
      const participantProfile2 = await Profile.findOne({ userId: recipient });
      console.log(participantProfile1, participantProfile2);
      await Conversation.create({
        participants: [userId, recipient],
        participantProfiles: [participantProfile1._id, participantProfile2._id],
        messages: [message],
        mostRecentMsg: message,
        unreadMsgs: 1,
      });
      res.status(200).json({
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Could not create conversation" });
  }
});

// @route POST /:id
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
      content,
      type,
    });
    await Conversation.findOneAndUpdate(
      {
        $and: [
          { participants: { $in: userId } },
          { participants: { $in: recipient } },
        ],
      },
      {
        $push: { messages: message._id },
        mostRecentMsg: message._id,
        $inc: { unreadMsgs: 1 },
      }
    );
    res.status(201).json({
      message,
    });
  } catch (error) {
    return res.status(500).json({ error: "Could not send mesage" });
  }
});

// @route PATCH /image/:id
// add image to a message
exports.newImage = asyncHandler(async (req, res) => {
  const recipient = req.params.id;
  let decoded = decodeToken(req.cookies.token);
  const userId = decoded.id;
  try {
    const message = await Message.create({
      sender: userId,
      recipient,
      content: req.file.path,
      type: "img",
    });
    await Conversation.findOneAndUpdate(
      {
        $and: [
          { participants: { $in: userId } },
          { participants: { $in: recipient } },
        ],
      },
      {
        $push: { messages: message._id },
        mostRecentMsg: message._id,
        $inc: { unreadMsgs: 1 },
      }
    );
    res.status(200).json({
      message,
    });
  } catch (error) {
    return res.status(500).json({ error: "Could not attach image to mesage" });
  }
});

// @route GET /conversation/all
// Populate chat links with all conversations
exports.getConversations = asyncHandler(async (req, res) => {
  let decoded = decodeToken(req.cookies.token);
  const userId = decoded.id;

  try {
    const conversations = await Conversation.find({
      $and: [{ participants: { $in: userId } }, { deleted: false }],
    })
      .populate("mostRecentMsg")
      .populate("participantProfiles");
    res.status(200).json({
      conversations,
    });
  } catch (error) {
    return res.status(500).json({ error: "Could not get conversation" });
  }
});

// @route DELETE /conversation/delete/:id
// Delete conversation
exports.deleteConversation = asyncHandler(async (req, res) => {
  let conversationId = req.params.id;
  try {
    await Conversation.findOneAndUpdate(
      { _id: conversationId },
      { deleted: true }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "Could not delete conversation" });
  }
});

// @route PATCH /messages/read/:id
// Mark all messages in a converstion as read
exports.readMessages = asyncHandler(async (req, res) => {
  const conversationId = req.params.id;
  try {
    const conversation = await Conversation.findOne({
      _id: conversationId,
    }).populate("messages");
    conversation.messages.forEach(async (message) => {
      if (message.read === false) {
        message.read = true;
        await message.save();
      }
    });
    await Conversation.findOneAndUpdate(
      { _id: conversationId },
      { unreadMsgs: 0 }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Could not mark messages in conversation as read" });
  }
});

// @route GET /conversation/show/:id
// Get a conversation with messages with a another user
exports.getConversation = asyncHandler(async (req, res) => {
  const conversationId = req.params.id;
  try {
    const conversation = await Conversation.findOneAndUpdate(
      { _id: conversationId },
      { unreadMsgs: 0 }
    )
      .populate("messages")
      .populate("participantProfiles");
    res.status(200).json({
      conversation,
    });
  } catch (error) {
    return res.status(500).json({ error: "Could not get conversation" });
  }
});

// @route PATCH /conversation/pin/:id
// Pin conversation to the top of the sidebar
exports.pinConversation = asyncHandler(async (req, res) => {
  const conversationId = req.params.id;
  try {
    await Conversation.findOneAndUpdate(
      { _id: conversationId },
      { pinned: true }
    );
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ error: "Could not pin conversation" });
  }
});

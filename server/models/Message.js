const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    type: {
      type: String,
      enum: ['msg', 'img'],
    },
    read: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      required: true,
    },
    sendDate: {
      type: Date,
    },
  },
  { timestamps: true },
);

module.exports = Message = mongoose.model('message', MessageSchema);

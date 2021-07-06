const mongoose = require('mongoose');

const arrayLimit = (val) => {
  return val.length <= 2;
};

const ConversationSchema = new mongoose.Schema({
  participants: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
    ],
    validate: [arrayLimit, 'Participants exceed the limit of 2'],
  },
  participantProfiles: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profile',
        required: true,
      },
    ],
  },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'message' }],
  mostRecentMsg: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'message',
    default: '',
  },
  // change to array
  deleted: {
    type: Boolean,
    default: false,
  },
  // change to array
  pinned: {
    type: Boolean,
    default: false,
  },
  unreadMsgs: {
    type: Number,
    default: 0,
  },

  // [
  //   {
  //     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  //     quantity: { type: Number, default: 0, required: true  },
  //   },
  // ],
});

module.exports = Conversation = mongoose.model('conversation', ConversationSchema);

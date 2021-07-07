const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
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
      enum: ['bookingRequested', 'bookingConfirmed', 'bookingCancelled', 'message', 'reminder'],
      required: true,
    },
    title: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// mongoose.Schema.path("sender").required(() => {
//   return this.type === "message"
// })

module.exports = Notification = mongoose.model('notification', NotificationSchema);

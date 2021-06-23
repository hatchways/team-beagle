const mongoose = require("mongoose")

const NotificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  type: {
    type: String,
    enum: ["bookingConfirmed", "bookingCancelled", "message", "reminder"],
    required: true,
  },
  title: {
    type: String,
  },
  read: {
    type: Boolean,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  }
})

module.exports = Notification = mongoose.model("notification", notificationSchema);


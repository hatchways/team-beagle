const mongoose = require("mongoose")

const NotificationSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
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
  },
})

mongoose.Schema.path("sender").required(() => {
  return this.type === "message"
})

module.exports = Notification = mongoose.model(
  "notification",
  NotificationSchema
)

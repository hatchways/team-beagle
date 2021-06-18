const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userCredentials: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  //
  isDogOwner: {
    type: Boolean,
    required: true,
  },
  isDogSitter: {
    type: Boolean,
    required: true,
  },
  //  sitter
  rating: {
    type: Number,
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
  tagLine: {
    type: String,
    required: true,
  },
});

module.exports = Profile = mongoose.model("profile", profileSchema);

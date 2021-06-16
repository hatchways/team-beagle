const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
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
  is_dog_owner: {
    type: Boolean,
    required: true,
  },
  is_dog_sitter: {
    type: Boolean,
    required: true,
  },
  //  sitter
  hours_available: {
    type: Number,
    required: true,
  },
  hourly_rate: {
    type: Number,
    required: true,
  },
  tag_line: {
    type: String,
    required: true,
  },
});

module.exports = Profile = mongoose.model("profile", profileSchema);

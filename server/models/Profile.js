const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user_id: {
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
    // if sitter require
    type: Number,
  },
  tagLine: {
    // if sitter require
    type: String,
  },
});

requestSchema.pre("validate", function (next) {
  if ((this.isDogSitter && !this.hourlyRate) || !this.tagLine) {
    next(new Error("Must include, hourly rate, tag line"));
  } else {
    next();
  }
});

module.exports = Profile = mongoose.model("profile", profileSchema);

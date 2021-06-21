const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: {
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
  //  sitter
  isDogSitter: {
    type: Boolean,
    required: true,
  },

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

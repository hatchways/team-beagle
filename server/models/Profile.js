const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    unique: true,
    required: true,
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
  images: [
    {
      type: String,
    },
  ],
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

profileSchema.pre("validate", function (next) {
  if (this.isDogSitter && !this.hourlyRate) {
    next(new Error("Must include hourly rate"));
  } else if (this.isDogSitter && !this.tagLine) {
    next(new Error("Must include tag line"));
  } else {
    next();
  }
});

module.exports = Profile = mongoose.model("profile", profileSchema);

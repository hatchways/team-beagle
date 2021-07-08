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
  default: [],

  //  sitter
  isDogSitter: {
    type: Boolean,
    required: true,
  },
  availabilityWeek: {
    monday: { type: Boolean, default: false },
    tuesday: { type: Boolean, default: false },
    wednesday: { type: Boolean, default: false },
    thursday: { type: Boolean, default: false },
    friday: { type: Boolean, default: false },
    saturday: { type: Boolean, default: false },
    sunday: { type: Boolean, default: false },
  },
  availabilityDays: {
    additionalDays: [{ type: Date }],
    offDays: [{ type: Date }],
  },

  rating: {
    type: Number,
  },
  numberOfReviews: {
    type: Number,
  },
  hourlyRate: {
    // if sitter require
    type: Number,
  },
  tagLine: {
    // if sitter require
    type: String,
    default: "",
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

const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  sitter_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  endDate: {
    type: Date,
    required: true,
    default: () => new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
  },
  accept: {
    type: Boolean,
    default: false,
  },
  decline: {
    type: Boolean,
    default: false,
  },
  paid: {
    type: Boolean,
    default: false,
  },
});

requestSchema.pre("validate", function (next) {
  if (this.startDate > this.endDate) {
    next(new Error("End Date must be greater than Start Date"));
  } else {
    next();
  }
});

module.exports = Request = mongoose.model("request", requestSchema);

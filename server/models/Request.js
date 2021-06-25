const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  sitterId: {
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
    default: null,
  },
  decline: {
    type: Boolean,
    default: null,
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

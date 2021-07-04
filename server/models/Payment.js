const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  customerId: {
    type: String,
  },
  customerSecret: {
    type: String,
  },
  customerAcct: {
    type: String,
  },
});

module.exports = Payment = mongoose.model("payment", paymentSchema);

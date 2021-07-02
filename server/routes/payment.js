const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  getPaymentSecret,
  createPaymentIntent,
  detachPaymentMethod,
  addPaymentMethod,
  payBooking,
} = require("../stripe");

router.route("/secret").get(protect, getPaymentSecret);
router.route("/delete").delete(protect, detachPaymentMethod);
router.route("/add").post(protect, addPaymentMethod);
router.route("/pay-booking/:id").post(protect, payBooking);

router.route("/new-payment").post(protect, createPaymentIntent);

module.exports = router;

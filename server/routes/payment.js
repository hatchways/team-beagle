const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  getPaymentSecret,
  createPaymentIntent,
  detachPaymentMethod,
} = require("../stripe");

router.route("/secret").get(protect, getPaymentSecret);
router.route("/delete").get(protect, detachPaymentMethod);

router.route("/new-payment").post(protect, createPaymentIntent);

module.exports = router;

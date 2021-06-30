const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { getPaymentSecret, createPaymentIntent } = require("../stripe");

router.route("/secret").get(protect, getPaymentSecret);
router.route("/new-payment").post(protect, createPaymentIntent);

module.exports = router;

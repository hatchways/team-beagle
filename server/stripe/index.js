require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const decodeToken = require("../utils/decodeToken");
const Profile = require("../models/Profile");
const User = require("../models/User");
const Payment = require("../models/Payment");

// @route GET /payment/secret
// @desc returns secret, create payment if there isn't one
const getPaymentSecret = async (req, res, next) => {
  let decoded = decodeToken(req.cookies.token);
  const userId = decoded.id;

  try {
    let payment;
    let customerSecret;
    payment = await Payment.find({
      userId: userId,
    });

    if (payment && payment[0].customerSecret) {
      customerSecret = payment[0].customerSecret;
    } else {
      const user = await User.findById(userId);
      const customer = await stripe.customers.create({
        description: "Loving Sitter",
        email: user.email,
      });
      const intent = await stripe.setupIntents.create({
        customer: customer.id,
      });
      customerSecret = intent.client_secret;
      payment = await Payment.create({
        userId,
        customerId: customer.id,
        customerSecret: customerSecret,
      });
    }
    res.status(200).json({ customerSecret });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// @route POST /payment/new-payment
// @desc create/returns new payment
const createPaymentIntent = async (req, res, next) => {
  const amount = req.body.hourlyRate * req.body.hours * 100;
  const { currency } = req.body;
  try {
    let payment;
    payment = await Payment.find({
      userId: userId,
    });
    const paymentMethods = await stripe.paymentMethods.list({
      customer: payment.customerId,
      type: "card",
    });
    const paymentIntent = await stripe.paymentIntents.create({
      customer: payment.customerId,
      amount,
      currency,
      payment_method: paymentMethods.data[0].id,
      off_session: true,
      confirm: true,
    });
    res.status(200).json({ paymentIntent });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = { getPaymentSecret, createPaymentIntent };

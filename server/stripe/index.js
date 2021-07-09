require("dotenv").config();
const moment = require("moment");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const decodeToken = require("../utils/decodeToken");
const Profile = require("../models/Profile");
const User = require("../models/User");
const Payment = require("../models/Payment");

// @route GET /payment/secret
// @desc returns secret, create payment if there isn't one
const getPaymentSecret = async (req, res, next) => {
  const userId = req.user.id;
  try {
    let payment;
    let customerSecret;
    payment = await Payment.findOne({
      userId: userId,
    });

    if (payment && payment.customerSecret) {
      customerSecret = payment.customerSecret;
      const paymentMethods = await stripe.paymentMethods.list({
        customer: payment.customerId,
        type: "card",
      });
      return res
        .status(200)
        .json({ customerSecret, card: paymentMethods.data[0] });
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
    return res.status(200).json({ customerSecret });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// @route POST /payment/delete
// @desc detachs first payment method
const detachPaymentMethod = async (req, res, next) => {
  const userId = req.user.id;

  try {
    let payment;
    payment = await Payment.findOne({
      userId: userId,
    });

    const paymentMethods = await stripe.paymentMethods.list({
      customer: payment.customerId,
      type: "card",
    });

    const detachedPaymentMethod = await stripe.paymentMethods.detach(
      paymentMethods.data[0].id
    );
    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: userId },
      { isPaymentMethod: false },
      { new: true }
    );
    return res.status(200).json({ detachedPaymentMethod });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// @route POST /payment/add
// @desc detachs first payment method
const addPaymentMethod = async (req, res, next) => {
  const userId = req.user.id;
  const paymentMethodId = req.body.paymentMethodId;
  const paymentCurrency = req.body.currency;

  try {
    const payment = await Payment.findOne({
      userId: userId,
    });
    const attachedPaymentMethod = await stripe.paymentMethods.attach(
      paymentMethodId,
      { customer: payment.customerId }
    );

    const updatedPayment = await Payment.findOneAndUpdate(
      { userId: userId },
      {
        paymentMethodId,
        paymentCurrency,
      }
    );

    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: userId },
      { isPaymentMethod: true },
      { new: true }
    );
    return res.status(200).json({ attachedPaymentMethod });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// @route POST /payment/pay-booking/:id
// @desc create/returns new payment
const payBooking = async (req, res, next) => {
  const sitterId = req.user.id;
  const requestId = req.params.id;

  const request = await Request.findOne({
    _id: requestId,
    sitterId: sitterId,
  });
  if (!request) res.status(400).json("invaild booking for sitter");

  const sitterProfile = await Profile.findOne({ userId: sitterId });
  const sitterUser = await User.findById(sitterId);
  const sitterPayment = await Payment.findOne({ userId: sitterId });

  console.log(sitterUser, sitterPayment);
  if (!sitterPayment || !sitterPayment.paymentMethodId)
    return res.status(400).json("dog sitter has not set payments");

  const start = new moment(request.startDate);
  const end = new moment(request.endDate);
  const duration = moment.duration(end.diff(start));
  const hours = Math.floor(duration.asHours());
  const amount = sitterProfile.hourlyRate * hours * 100;

  const ownerId = request.userId;
  const ownerPayment = await Payment.findOne({
    userId: ownerId,
  });
  if (!ownerPayment || !ownerPayment.paymentMethodId)
    return res.status(400).json("dog owner has not set payments");

  const paymentIntent = await stripe.paymentIntents.create({
    customer: ownerPayment.customerId,
    amount,
    currency: sitterPayment ? sitterPayment.paymentCurrency : "usd",
    payment_method: ownerPayment.paymentMethodId,
    off_session: true,
    confirm: true,
    description: `${sitterProfile.firstName} ${sitterProfile.lastName} ${sitterUser.email}`,
  });
  if (paymentIntent) res.status(200).json({ paymentIntent });
  else res.status(500).json({ message: error });
};

module.exports = {
  getPaymentSecret,
  detachPaymentMethod,
  addPaymentMethod,
  payBooking,
};

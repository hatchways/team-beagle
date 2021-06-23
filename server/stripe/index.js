require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET)

const createCustomer = async (req, res, next) => {
  const { email, address, currency, notes} = req.body
  try {
    const customer = await stripe.customers
      .create({
        description: notes,
        email,
        address,
        currency
      })
      return customer
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

const createPaymentIntent = async (req, res, next) => {
  const amount = req.body.hourlyRate * req.body.hours * 100
  const { currency } = req.body
  try {
    const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    payment_method_types: ['card'],
    })
    res.send({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}



module.exports = { createCustomer, createPaymentIntent }

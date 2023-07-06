const express = require("express");
const dotenv = require("dotenv").config();
const body_parser = require("body-parser");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const cors = require("cors");

const app = express();
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use(cors());

app.listen(process.env.PORT || 4000, () => {
  console.log("server is runing");
});

app.post("/payment", cors(), (req, res) => {
  const { id, amount } = req.body;

  try {
    const payment = stripe.paymentIntents.create({
      amount,
      currency: "USD",
      Description: "Payment",
      payment_method: id,
      confirm: true,
    });
    console.log("Payment", payment);
    res({
      message: "Payment Was Successful",
      success: true,
    });
  } catch (error) {
    console.log("error", error);
    res({
      message: "Payment Failed",
      success: false,
    });
  }
});

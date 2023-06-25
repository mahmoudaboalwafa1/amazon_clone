// One Step Import Backend Property By require
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const STRIPE_SECRET_TOKEN = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(STRIPE_SECRET_TOKEN);

// Two Step Create Config App Express
const app = express();

// Three Step Convert To Cors true And To json
app.use(cors({ origin: true }));
app.use(express.json());

// Four Step Route
app.get("/", (req, res) => {
  res.status(200).send("Hello World I'Am FullStack");
});

// Five Step Post For Stripe
app.post("/payment", async (req, res) => {
  const total = req.query.total;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// six Step turn functions
exports.api = functions.https.onRequest(app);

// Link End Point (http://127.0.0.1:5001/learn-auth-f2939/us-central1/api)

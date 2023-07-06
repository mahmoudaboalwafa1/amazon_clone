import React, { useState } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useRef } from "react";

const stripeForm = () => {
  const [success, setSuccess] = useState(true);
  const stripe = useStripe();
  const elements = useElements();

  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        color: "black",
        fontWeight: "500",
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "black",
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(
        CardCvcElement,
        CardExpiryElement,
        CardNumberElement
      ),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:5173/payment", {
          amount: 1000,
          id,
        });

        if (response.data.success) {
          console.log("Succesfull");
          setSuccess(true);
        }
      } catch (err) {
        console.log("Error", err.messgae);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {success ? (
        <form>
          <fieldset>
            <legend>Card Number</legend>
            <CardNumberElement options={CARD_OPTIONS} />
          </fieldset>
          <fieldset>
            <legend>Card Expiry</legend>
            <CardExpiryElement options={CARD_OPTIONS} />
          </fieldset>
          <fieldset>
            <legend>Card CVC</legend>
            <CardCvcElement option={CARD_OPTIONS} />
          </fieldset>
          <button onSubmit={handleSubmit}>Pay</button>
        </form>
      ) : (
        <div className="payment-success">
          <h2>Payment successful</h2>
          <h3 className="Thank-you">Thank you for your patronage</h3>
        </div>
      )}
    </>
  );
};

export default stripeForm;

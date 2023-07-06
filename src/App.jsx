import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components import
import Collection from "./components/Collection/Collection";
import { Home, Signin, Basket, Payment } from "./components/index";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PROMISE);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Collection element={<Home />} />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/basket" element={<Collection element={<Basket />} />} />
        <Route
          path="/payment"
          element={
            <Elements stripe={stripePromise}>
              <Collection element={<Payment />} />
            </Elements>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

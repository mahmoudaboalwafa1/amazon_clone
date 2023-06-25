import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import Collection from "./components/Collection/Collection";
import Home from "./components/Home/Home";
import Signin from "./components/signin/Signin";
import Basket from "./components/Basket/Basket";
import Payment from "./components/Payment/Payment";
import { loadStripe } from "@stripe/stripe-js";

const App = () => {
  const stripePromise = loadStripe(
    "pk_test_51N6zBbE8daoX84Cwlyisrc13MFEyxEP84OP8C2HZNo4Qob7KlikhjYoErRV79gUkiAdVUJGHTBYBdYdDwNPmrz5y008I0wnhIN"
  );
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

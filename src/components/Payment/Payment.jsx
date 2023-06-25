import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import "./payment.css";
import { Link, useNavigate } from "react-router-dom";
import BasketItems from "../Basket/BasketItems";
import { useSelector } from "react-redux";
import axios from "../../data/axios";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const Payment = () => {
  const [databaseBasket, setBasket] = useState([]);
  const [disable, setDisable] = useState(true);
  const [processing, setProcessing] = useState("");
  const [error, setErorr] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState();
  const totalBasket = databaseBasket.reduce(
    (acc, current) => +acc + +current.price,
    0
  );

  const dataUser = useSelector((state) => state.UserReducer.user);
  onSnapshot(collection(db, "data_basket"), (items) => {
    const dataItems = items.docs.map((item) => item.data());
    setBasket(dataItems);
  });

  useEffect(() => {
    async () => {
      const response = await axios({
        method: "post",
        url: `/payment?total=${totalBasket > 0 && totalBasket}`,
      });

      setClientSecret(response.data.clientSecret);
      return response;
    };
  }, [totalBasket]);
  const handleChange = (e) => {
    setDisable(e.empty);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisable(true);
    console.log(clientSecret);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        console.log("succeed");
      });

    console.log(payload);
  };

  return (
    <section className="payment">
      <h3>
        Checkout (<Link to="/basket">{databaseBasket.length} items</Link>)
      </h3>
      <div className="address">
        <h4>Delivery Address</h4>
        <ul className="text-address">
          <li>{dataUser && dataUser.email}</li>
          <li>Alexandria, Egypt</li>
        </ul>
      </div>
      <div className="review">
        <div className="container">
          <h5>Review items and delivery</h5>
          <div>
            <BasketItems />
          </div>
        </div>
      </div>
      <div className="payment-method">
        <div className="container">
          <h5>payment Method</h5>
          <form onSubmit={handleSubmit}>
            <CardElement onChange={handleChange} />
            <label>orderTotal: ${totalBasket}</label>
            <button disabled={disable}>Buy Now</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Payment;

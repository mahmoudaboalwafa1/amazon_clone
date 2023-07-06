import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import "./payment.css";
import { Link } from "react-router-dom";
import BasketItems from "../Basket/BasketItems";
import { useSelector } from "react-redux";
import StripeForm from "../../StripeForm";

const Payment = () => {
  const [databaseBasket, setBasket] = useState([]);
  const totalBasket = databaseBasket.reduce(
    (acc, current) => +acc + +current.price,
    0
  );

  const dataUser = useSelector((state) => state.UserReducer.user);
  onSnapshot(collection(db, "data_basket"), (items) => {
    const dataItems = items.docs.map((item) => item.data());
    setBasket(dataItems);
  });

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
          <StripeForm />
        </div>
      </div>
    </section>
  );
};

export default Payment;

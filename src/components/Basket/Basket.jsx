import React, { useState } from "react";
import "./basket.css";
import { basketbg } from "../../images";
import { useSelector } from "react-redux";
import BasketItems from "./BasketItems";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";

const Basket = () => {
  const dataUser = useSelector((state) => state.UserReducer.user);
  const [databaseBasket, setBasket] = useState([]);
  onSnapshot(collection(db, "data_basket"), (items) => {
    const dataItems = items.docs.map((item) => item.data());
    setBasket(dataItems);
  });
  const total = databaseBasket.reduce((acc, current) => {
    return parseInt(acc + +current.price);
  }, 0);

  return (
    <div className="basket">
      <div className="container">
        <div className="basket-bg">
          <img src={basketbg} alt="basket-background" />
          <strong>Hello {dataUser ? dataUser.email : "Guest"},</strong>
          <h3>Your Basket Shopping</h3>
          <div className="basket-items">
            <BasketItems />
          </div>
        </div>
        <div className="basket-text">
          <div className="container">
            <p>
              Subtotal ({databaseBasket.length} items):{" "}
              <strong>${total.toFixed(2)}</strong>
            </p>
            <div>
              <input type="checkbox" id="order" />
              <label htmlFor="order">This order contains a gift</label>
            </div>
            <Link to="/payment">Proceed to Checkout</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;

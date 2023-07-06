import React from "react";
import { useDispatch } from "react-redux";
import { addBasket } from "../../redux/actions/Action";
import { products } from "../../data/index";
// Firebase Firestore
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

import "./home.css";

const Home = () => {
  const dispatch = useDispatch();
  const addToBasket = (text, price, rate, imgProducts, alt, id) => {
    const data = {
      text: text,
      price: price,
      rate: rate,
      img: imgProducts,
      alt: alt,
      id: id,
    };

    const database = collection(db, "data_basket");
    addDoc(database, data);
    dispatch(addBasket(data));
  };

  return (
    // Start Home Page
    <section className="home">
      <div className="overlay"></div>
      <div className="container">
        {/* Start Products */}
        {products.map((product, index) => {
          const { textProduct, priceProducts, stars, alt, imgProducts } =
            product;
          return (
            <div className="card" key={index}>
              <div className="container">
                <p>{textProduct}</p>
                <strong>
                  <small>$</small>
                  {priceProducts}
                </strong>
                <div>
                  {stars.map((star, index) => (
                    <img src={star} alt={alt} key={index} className="star" />
                  ))}
                </div>
                <div className="img-container">
                  <img
                    src={imgProducts}
                    alt={"product- " + index}
                    className="img-product"
                  />
                  <button
                    onClick={() =>
                      addToBasket(
                        textProduct,
                        priceProducts,
                        stars,
                        imgProducts,
                        alt,
                        index
                      )
                    }
                  >
                    Add to Basket
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* End Products */}
    </section>
  );
  // End Home Page
};

export default Home;

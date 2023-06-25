import React from "react";
import { useDispatch } from "react-redux";
import "./home.css";
import { products } from "../../data/index";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

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
    dispatch(AddBasket(data));
  };
  return (
    <section className="home">
      <div className="overlay"></div>
      <div className="container">
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
    </section>
  );
};

export default Home;

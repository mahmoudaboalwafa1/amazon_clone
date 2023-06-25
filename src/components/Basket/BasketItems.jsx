import React, { useEffect, useState } from "react";
import "./basketItems.css";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const BasketItems = () => {
  const [databaseBasket, setBasket] = useState([]);

  const RemoveFormBasket = (index) => {
    const indexBask = databaseBasket.findIndex((_, i) => i === index);
    if (indexBask >= 0) {
      deleteDoc(doc(db, "data_basket", databaseBasket[index].id));
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "data_basket"), (items) => {
      const itemsBasket = items.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      setBasket(itemsBasket);
    });

    return () => {
      unsubscribe();
    };
  }, [databaseBasket]);

  return (
    <>
      {databaseBasket.map((item, index) => {
        return (
          <div className="basket-item" key={index}>
            <img src={item.img} alt={item.alt} />
            <div className="basket-items-text">
              <strong>{item.text}</strong>
              <div>
                <small>$</small>
                <strong>{item.price}</strong>
                <ul>
                  {item.rate.map((star, index) => {
                    return (
                      <li key={index}>
                        <img
                          className="star"
                          src={star}
                          key={index}
                          alt={"star -" + index}
                        />
                      </li>
                    );
                  })}
                </ul>
                <button onClick={() => RemoveFormBasket(index)}>
                  Remove Form Basket
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default BasketItems;

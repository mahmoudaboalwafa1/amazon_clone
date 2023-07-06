import { ADD_BASKET, SET_USER } from "./Types";

const SetUser = (payload) => {
  return {
    type: SET_USER,
    basket: [],
    user: payload,
  };
};

const addBasket = (payload) => {
  return { type: ADD_BASKET, basket: payload };
};

export { SetUser, addBasket };

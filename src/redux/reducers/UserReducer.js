import { ADD_BASKET, SET_USER } from "../actions/Types";

const initializeState = {
  basket: [],
  user: null,
};

const UserReducer = (state = initializeState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    case ADD_BASKET:
      return { ...state, basket: action.basket };
  }
  return state;
};

export default UserReducer;

import { SET_USER } from "../actions/Types";

const initializeState = {
  basket: [],
  user: null,
};

const UserReducer = (state = initializeState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
  }
  return state;
};

export default UserReducer;

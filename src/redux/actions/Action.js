import { SET_USER } from "./Types";

const SetUser = (payload) => {
  return {
    type: SET_USER,
    basket: [],
    user: payload,
  };
};

export { SetUser };

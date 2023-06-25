import { combineReducers, createStore } from "redux";
import UserReducer from "./reducers/UserReducer";

const store = createStore(
  combineReducers({
    UserReducer,
  })
);

export default store;

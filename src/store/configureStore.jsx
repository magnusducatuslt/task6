import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import * as rootReducer from "./reducers";

export default function configureStore(state) {
  const reducer = combineReducers(rootReducer);
  return createStore(reducer, state, applyMiddleware(thunk));
}

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducer/rootReducer";

import { sessionService } from "redux-react-session";

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(thunk))
);

sessionService.initSessionService(store, { driver: "COOKIES" });

export default store;

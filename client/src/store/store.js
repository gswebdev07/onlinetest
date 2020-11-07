import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

// Reducers ...
import { user_reducers } from "./reducers/user_reducers";
import { data_reducers } from "./reducers/data_reducers";
import { test_reducers } from "./reducers/test_reducers";
import content_reducer from "./reducers/content_reducer";

const initialState = {};
const middleware = [thunk, logger];

const rootReducers = combineReducers({
  user: user_reducers,
  data: data_reducers,
  test: test_reducers,
  content: content_reducer,
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
  // other store enhancers if any
);
const store = createStore(rootReducers, initialState, enhancer);

export default store;

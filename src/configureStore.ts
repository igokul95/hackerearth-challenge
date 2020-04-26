import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";

import { rootReducer } from "./reducers";
import { RootInputAction, RootOutputAction, RootState } from "./types";
import { dependencies } from "./api/APIs";
import { rootEpic } from "./epics";

const epicMiddleware = createEpicMiddleware<
  RootInputAction,
  RootOutputAction,
  RootState
>({
  dependencies: dependencies
});

const configureStore = (initialState = {}) => {
  const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
  epicMiddleware.run(rootEpic);
  return store;
};

export const store = configureStore({});


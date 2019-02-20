import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";

import { name as key } from "../../package.json";
import getReducers from "./reducers";
import initialState from "./initial-state";

export const store = createStore(
  persistReducer(
    { whitelist: ["session"], key, storage },
    getReducers(initialState)
  ),
  composeWithDevTools()
);

export const persistor = persistStore(store);

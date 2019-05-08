import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";

import { name as key } from "package";
import getReducers from "reducers";

export const store = createStore(
  persistReducer({ whitelist: ["persisted"], key, storage }, getReducers()),
  composeWithDevTools()
);

export const persistor = persistStore(store);

import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";

import { NODH as key } from "constants/index";
import getReducers from "reducers";

export default () => {
  const store = createStore(
    persistReducer({ whitelist: ["persisted"], key, storage }, getReducers()),
    composeWithDevTools()
  );
  const persistor = persistStore(store);

  return [store, persistor];
};

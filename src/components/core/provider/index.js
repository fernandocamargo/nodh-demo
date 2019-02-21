import isFunction from "lodash/isFunction";
import React, { createElement } from "react";
import { StoreContext as Redux } from "redux-react-hook";
import { PersistGate as ReduxPersist } from "redux-persist/integration/react";

import { store, persistor } from "store";

export const create = component => props => createElement(component, props);

export const transpass = ({ children }) => children;

export const render = component => {
  const format = isFunction(component) ? create : transpass;

  return format(component);
};

export default component => (
  <Redux.Provider value={store}>
    <ReduxPersist persistor={persistor}>{render(component)}</ReduxPersist>
  </Redux.Provider>
);

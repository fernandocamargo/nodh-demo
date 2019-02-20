import isFunction from "lodash/isFunction";
import React, { createElement } from "react";
import { Provider as Redux } from "react-redux";
import { PersistGate as ReduxPersist } from "redux-persist/integration/react";

import { store, persistor } from "store";

export const create = component => props => createElement(component, props);

export const transpass = ({ children }) => children;

export const render = component => {
  const format = isFunction(component) ? create : transpass;

  return format(component);
};

export default component => (
  <Redux store={store}>
    <ReduxPersist persistor={persistor}>{render(component)}</ReduxPersist>
  </Redux>
);

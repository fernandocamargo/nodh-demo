import property from "lodash/property";
import React from "react";
import { Provider as Redux } from "react-redux";
import { PersistGate as ReduxPersist } from "redux-persist/integration/react";

import { TESTING } from "constants/index";
import { data as getStore } from "store";

const [store, persistor] = getStore();

export default ({ children }) => {
  const Persistence = TESTING ? property("children") : ReduxPersist;

  return (
    <Redux store={store}>
      <Persistence persistor={persistor} loading="Loading...">
        {children}
      </Persistence>
    </Redux>
  );
};

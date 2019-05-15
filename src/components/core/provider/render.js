import React from "react";
import { Provider as Redux } from "react-redux";
import { PersistGate as ReduxPersist } from "redux-persist/integration/react";

import { data as useStore } from "store";

export default ({ name, children }) => {
  const [store, persistor] = useStore(name);

  return (
    <Redux store={store}>
      <ReduxPersist persistor={persistor} loading="Loading...">
        {children}
      </ReduxPersist>
    </Redux>
  );
};

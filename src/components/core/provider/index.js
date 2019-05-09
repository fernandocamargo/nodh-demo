import React, { memo, useState, useCallback } from "react";
import { StoreContext as Redux } from "redux-react-hook";
import { PersistGate as ReduxPersist } from "redux-persist/integration/react";

import { store, persistor } from "store";
import { Meta, Log } from "contexts";
import { start, end } from "mutations";
import { Renderer } from "components/core";

export default memo(component => {
  const [log, setLog] = useState({ actions: new Map(), threads: new Map() });
  const register = useCallback(details => setLog(start(details)), []);
  const update = useCallback(details => setLog(end(details)), []);

  return (
    <Redux.Provider value={store}>
      <Meta.Provider>
        <Log.Provider value={{ log, register, update }}>
          <ReduxPersist persistor={persistor} loading="Loading...">
            <Renderer>{component}</Renderer>
          </ReduxPersist>
        </Log.Provider>
      </Meta.Provider>
    </Redux.Provider>
  );
});

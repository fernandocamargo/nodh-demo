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

  console.clear();
  console.group("actions");
  console.log(JSON.stringify(Array.from(log.actions), null, 2));
  console.groupEnd();
  console.group("threads");
  console.log(JSON.stringify(Array.from(log.threads), null, 2));
  console.groupEnd();

  return (
    <Redux.Provider value={store}>
      <Meta.Provider>
        <Log.Provider value={{ log, register, update }}>
          <ReduxPersist persistor={persistor}>
            <Renderer>{component}</Renderer>
          </ReduxPersist>
        </Log.Provider>
      </Meta.Provider>
    </Redux.Provider>
  );
});

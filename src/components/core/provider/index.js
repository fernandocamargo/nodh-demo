import update from "immutability-helper";
import React, { memo, useState, useCallback } from "react";
import { StoreContext as Redux } from "redux-react-hook";
import { PersistGate as ReduxPersist } from "redux-persist/integration/react";

import { store, persistor } from "store";
import { Meta, Log } from "contexts";
import { Renderer } from "components/core";

export default memo(component => {
  const [log, setLog] = useState({
    actions: new Map(),
    threads: new Map()
  });
  const register = useCallback(
    ({ path, action, thread, params }) =>
      setLog(state =>
        update(state, {
          actions: {
            $apply: actions =>
              actions.set(action, {
                threads: (
                  actions.get(action) || { threads: [] }
                ).threads.concat(thread),
                path
              })
          },
          threads: {
            $add: [
              [
                thread,
                {
                  begin: new Date().getTime(),
                  loading: true,
                  action,
                  params
                }
              ]
            ]
          }
        })
      ),
    []
  );

  return (
    <Redux.Provider value={store}>
      <Meta.Provider>
        <Log.Provider value={{ log, register }}>
          <ReduxPersist persistor={persistor}>
            <Renderer>{component}</Renderer>
          </ReduxPersist>
        </Log.Provider>
      </Meta.Provider>
    </Redux.Provider>
  );
});

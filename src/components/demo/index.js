import last from "lodash/last";
import React from "react";

import { useSlot, useLog } from "components/core";

import methods from "./methods";

export default () => {
  const [state, { getFoo }] = useSlot("demo", methods);
  const { loading, error, success } = last(useLog(getFoo));

  return (
    <div>
      <h1>Demo</h1>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <h2>Status</h2>
      <dl>
        <dt>Loading:</dt>
        <dd>{String(loading)}</dd>
      </dl>
      {!!error && (
        <dl>
          <dt>Error:</dt>
          <dd>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </dd>
        </dl>
      )}
      {!!success && (
        <dl>
          <dt>success:</dt>
          <dd>
            <pre>{JSON.stringify(success, null, 2)}</pre>
          </dd>
        </dl>
      )}
    </div>
  );
};

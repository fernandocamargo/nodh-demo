import last from "lodash/last";
import React, { useState, useCallback } from "react";

import { useSlot, useLog } from "components/core";

import methods from "./methods";

export const increment = value => value + 1;

export default () => {
  const [counter, setCounter] = useState(0);
  const incrementCounter = useCallback(() => setCounter(increment), []);
  const [state, { getRepos }] = useSlot("demo", methods);
  const clickToGetRepos = useCallback(() => getRepos(), []);
  const { loading, error, success } = last(useLog(getRepos));

  return (
    <div>
      <h1>Demo (counter: {counter})</h1>
      <button onClick={incrementCounter}>Increment counter</button>
      <button onClick={clickToGetRepos}>Fetch repos</button>
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

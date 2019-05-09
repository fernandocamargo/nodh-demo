import last from "lodash/last";
import React, { useState, useCallback, useEffect } from "react";

import { usePersisted, useVolatile, useLog } from "components/core";

const getGithubAPI = () =>
  [
    "https://api.github.com/search/repositories",
    !!Math.round(Math.random()) && "?q=react&sort=stars"
  ]
    .filter(Boolean)
    .join("");

const delay = (event, time) =>
  new Promise(resolve => window.setTimeout(() => resolve(event), time));

// async operation
const fetchGithubRepos = () =>
  delay(window.fetch(getGithubAPI()), 5000).then(response =>
    response.ok
      ? response.json()
      : Promise.reject({ message: response.statusText })
  );

// reducers
const newAttempt = () => ({ attempts = 0, ...state }) => ({
  ...state,
  attempts: attempts + 1
});

const setRepos = repos => state => ({ ...state, repos });

const incrementCounter = () => state => state + 1;

// actions
const actions = {
  getRepos: ({ persisted, volatile, thread }) => () =>
    fetchGithubRepos()
      .then(({ items, total_count }) => {
        volatile.save(setRepos(items));
        thread.success(
          `You could grab some response from your request, in this case, total of repos: ${total_count}`
        );
      })
      .catch(({ message }) => thread.fail(message))
      .finally(() => persisted.save(newAttempt()))
};

// selectors
const selector = persisted => persisted;

class Cycle {
  constructor() {
    this.cycles = 0;
  }

  count() {
    return (this.cycles += 1);
  }

  reset() {
    return (this.cycles = 0);
  }
}

const cycle = new Cycle();

const namespace = "github";

export default ({ onUnmount }) => {
  const { attempts = 0 } = usePersisted({ selector });
  const [{ repos = [] }, { getRepos }] = useVolatile({
    namespace,
    actions
  });
  const clickToGetRepos = useCallback(() => getRepos(), [getRepos]);
  const { loading, error, output, repeat } =
    last(useLog({ action: getRepos })) || {};
  const [counter, setCounter] = useState(0);
  const clickToIncrementCounter = useCallback(
    () => setCounter(incrementCounter()),
    []
  );
  const clickToRepeat = useCallback(() => repeat(), [repeat]);
  const clickToUnmount = useCallback(() => onUnmount(), [onUnmount]);
  useEffect(() => () => cycle.reset(), []);

  return (
    <div>
      <h1>Github repos for "React" (cycles: {cycle.count()})</h1>
      <h2>Counter: {counter}</h2>
      <button onClick={clickToUnmount}>Unmount</button>
      <button onClick={clickToIncrementCounter}>Increment counter</button>
      <h2>Attempts to fetch repos: {attempts}</h2>
      <button onClick={clickToGetRepos} disabled={loading}>
        {loading ? "Loading..." : "Fetch repos"}
      </button>
      {!!error && (
        <div style={{ color: "red" }}>
          <p>
            <strong>Error: </strong>
            <em>{error}</em>
          </p>
          <button onClick={clickToRepeat}>Try again</button>
        </div>
      )}
      {!!output && <p style={{ color: "green" }}>{output}</p>}
      <pre>{JSON.stringify(repos, null, 2)}</pre>
    </div>
  );
};

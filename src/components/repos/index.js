import last from "lodash/last";
import without from "lodash/without";
import React, { memo, useState, useCallback } from "react";

import { useActions, useLog } from "components/core";
import Repo from "components/repo";

// helpers
const sleep = duration =>
  new Promise(resolve => window.setTimeout(resolve, duration));

// services
const getGithubAPI = () =>
  [
    "https://api.github.com/search/repositories",
    !!Math.round(Math.random()) && "?q=react&sort=stars"
  ]
    .filter(Boolean)
    .join("");

// async operation
const fetchGithubRepos = () =>
  window
    .fetch(getGithubAPI())
    .then(response =>
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

const toggleLike = id => ({ liked = [], ...state }) => ({
  ...state,
  liked: !liked.includes(id) ? liked.concat(id) : without(liked, id)
});

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
      .finally(() => persisted.save(newAttempt())),
  like: ({ persisted, thread }) => id =>
    sleep(5000).then(() => {
      persisted.save(toggleLike(id));
      thread.success();
    })
};

// selector
const selector = ({
  persisted: { attempts = 0, liked = [] },
  volatile: { repos = [] }
}) => ({
  attempts,
  liked,
  repos
});

const style = { cursor: "pointer", padding: "10px" };

export default memo(({ onUnmount }) => {
  const [{ attempts, liked, repos }, { getRepos, like }] = useActions({
    namespace: "github",
    selector,
    actions
  });
  const clickToGetRepos = useCallback(() => getRepos(), [getRepos]);
  const { loading, error, output } = last(useLog({ action: getRepos })) || {};
  const [counter, setCounter] = useState(0);
  const clickToIncrementCounter = useCallback(
    () => setCounter(incrementCounter()),
    []
  );
  const clickToUnmount = useCallback(() => onUnmount(), [onUnmount]);
  const renderRepos = useCallback(
    repo => {
      const { id } = repo;

      return <Repo key={id} {...repo} liked={liked.includes(id)} like={like} />;
    },
    [liked, like]
  );

  return (
    <div>
      <h1>Github repos for "React"</h1>
      <h2>Counter: {counter}</h2>
      <button onClick={clickToUnmount} style={style}>
        Unmount
      </button>
      <button onClick={clickToIncrementCounter} style={style}>
        Increment counter
      </button>
      <h2>Attempts to fetch repos: {attempts}</h2>
      <button onClick={clickToGetRepos} style={style} disabled={loading}>
        Fetch repos {loading && "(loading...)"}
      </button>
      {!!error && (
        <p style={{ color: "red" }}>
          <strong>Error: </strong>
          <em>{error}</em>
        </p>
      )}
      {!!output && <p style={{ color: "green" }}>{output}</p>}
      {!loading && !error && !!repos.length && (
        <blockquote>{repos.map(renderRepos)}</blockquote>
      )}
    </div>
  );
});

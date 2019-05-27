import last from "lodash/last";
import without from "lodash/without";
import React, { useState, useCallback } from "react";
import { useActions, useLog } from "nodh";

import sleep from "helpers/promise/sleep";
import { Repo, Thread } from "components";

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
  getRepos: () => ({ persisted, volatile, thread }) =>
    fetchGithubRepos()
      .then(({ items, total_count }) => {
        volatile.save(setRepos(items));
        thread.success(
          `You could grab some response from your request, in this case, total of repos: ${total_count}`
        );
      })
      .catch(({ message }) => thread.fail(message))
      .finally(() => persisted.save(newAttempt())),
  like: id => ({ persisted, thread }) =>
    sleep({ duration: 5000 })
      .then(() => {
        persisted.save(toggleLike(id));
        thread.success();
      })
      .catch(() => {
        thread.fail("LOL, didn't work");
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

export default () => {
  const [
    { attempts = 0, liked = [], repos = [] },
    { getRepos, like }
  ] = useActions({
    namespace: "github",
    selector,
    actions
  });
  const clickToGetRepos = useCallback(() => getRepos(), [getRepos]);
  const thread = last(useLog({ action: getRepos }));
  const { loading, error } = thread;
  const [counter, setCounter] = useState(0);
  const clickToIncrementCounter = useCallback(
    () => setCounter(incrementCounter()),
    []
  );
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
      <button onClick={clickToIncrementCounter}>Increment counter</button>
      <h2>Attempts to fetch repos: {attempts}</h2>
      <button onClick={clickToGetRepos} disabled={loading}>
        Fetch repos {loading && "(loading...)"}
      </button>
      <Thread {...thread} />
      {!loading && !error && !!repos.length && (
        <blockquote>{repos.map(renderRepos)}</blockquote>
      )}
    </div>
  );
};

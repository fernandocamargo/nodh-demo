// async operation
export const fetchGithubRepos = () =>
  window
    .fetch("https://api.github.com/search/repositories?q=react")
    .then(response => response.json());

// reducers
export const newAttempt = () => ({ attempts = 0, ...state }) => ({
  ...state,
  attempts: attempts + 1
});

export const setRepos = repos => state => ({ ...state, repos });

// methods
export default ({ session, temp, thread }) => ({
  getRepos: () =>
    fetchGithubRepos()
      .then(({ items }) => {
        temp.save(setRepos(items));
        thread.success("You could grab some response from your request");
      })
      .catch(({ message }) => thread.fail(message))
      .finally(() => session.save(newAttempt()))
});

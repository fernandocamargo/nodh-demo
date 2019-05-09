import { Log } from "contexts";
import { useContext, useCallback } from "react";

export default ({ action: { fingerprint } }) => {
  const {
    log: { actions, threads }
  } = useContext(Log);
  const getLog = useCallback(
    () =>
      (actions.has(fingerprint) ? actions.get(fingerprint).threads : []).map(
        thread => threads.get(thread)
      ),
    [actions, threads, fingerprint]
  );

  return getLog();
};

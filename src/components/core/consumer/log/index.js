import isEqual from "lodash/isEqual";
import { useContext, useCallback } from "react";

import { Log } from "contexts";

export default ({ action: { fingerprint } }, params) => {
  const {
    log: { actions, threads }
  } = useContext(Log);
  const getLog = useCallback(() => {
    const log = actions.has(fingerprint)
      ? actions.get(fingerprint).threads
      : [];

    return log.reduce((stack, thread) => {
      const details = threads.get(thread);

      return !params || isEqual(details.params, params)
        ? stack.concat(details)
        : stack;
    }, []);
  }, [actions, threads, fingerprint, params]);

  return getLog();
};

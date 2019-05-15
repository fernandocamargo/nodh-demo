import isEqual from "lodash/isEqual";
import { useCallback } from "react";
import { useStoreState } from "pullstate";

import { log } from "store";

export default ({ action: { fingerprint } }, params) => {
  const getLog = useCallback(
    () =>
      useStoreState(log, ({ actions, threads }) => {
        const lol = actions.has(fingerprint)
          ? actions.get(fingerprint).threads
          : [];
        const rofl = lol.reduce((stack, thread) => {
          const details = threads.get(thread);

          return !params || isEqual(details.params, params)
            ? stack.concat(details)
            : stack;
        }, []);

        return !!rofl.length ? rofl : [{}];
      }),
    [fingerprint, params]
  );

  return getLog();
};

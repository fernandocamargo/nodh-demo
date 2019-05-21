import isEqual from "lodash/isEqual";
import { useCallback } from "react";
import { useStoreState } from "pullstate";

import get from "helpers/object/get";
import { EMPTY_LOG } from "constants/index";
import { log } from "store";

export default ({ action: { fingerprint } }, params) => {
  const selectThreads = useCallback(
    threads => (stack, thread) => {
      const details = threads.get(thread);
      const selected = !params || isEqual(details.params, params);

      return selected ? stack.concat(details) : stack;
    },
    [params]
  );
  const selectActions = useCallback(
    () => ({ actions, threads }) => {
      const selected = get(actions, [fingerprint, "threads"], []);
      const results = selected.reduce(selectThreads(threads), []);

      return !!results.length ? results : EMPTY_LOG;
    },
    [fingerprint, selectThreads]
  );

  return useStoreState(log, selectActions());
};

import isEqual from "lodash/isEqual";
import { useStoreState } from "pullstate";

import { log } from "store";

const EMPTY = [{}];

export default ({ action: { fingerprint } }, params) =>
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

    return !!rofl.length ? rofl : EMPTY;
  });

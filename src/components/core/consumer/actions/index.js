import first from "lodash/first";
import attempt from "lodash/attempt";
import md5 from "md5";
import { v4 } from "uuid";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import replace from "helpers/object/replace";
import NODH from "constants";
import { log } from "store";
import { start, end } from "mutations";
import { volatile } from "actions";
import select from "selectors";

export default ({ namespace, selector, actions }) => {
  const dispatch = useDispatch();
  const useState = useCallback(select({ namespace, selector }), [
    namespace,
    selector
  ]);
  const connect = useCallback(
    (path, callback) => {
      const identity = md5(callback);
      const location = [namespace].concat(path);
      const fingerprint = md5(JSON.stringify({ identity, location }));

      return Object.assign(
        (...params) => {
          const thread = v4();
          const typify = level =>
            `${NODH}: [${first(level)}] ${location.join(".")}();`;
          const save = path => mutation => {
            dispatch({ type: typify(path), path, mutation });

            return fingerprint;
          };
          const conclude = type => content =>
            log.update(end({ [type]: content, thread }));
          const effect = attempt(
            callback({
              persisted: { save: save(["persisted"]) },
              volatile: { save: save(["volatile", namespace]) },
              thread: { fail: conclude("error"), success: conclude("output") }
            }),
            ...params
          );
          const loading = effect !== fingerprint;
          const asynchronous = effect instanceof Promise;

          log.update(
            start({ namespace, path, fingerprint, thread, params, loading })
          );

          return asynchronous ? effect : Promise.resolve(effect);
        },
        { fingerprint }
      );
    },
    [namespace, dispatch]
  );
  const useActions = useCallback(() => replace(actions).with(connect), [
    actions,
    connect
  ]);

  useEffect(() => {
    const { mount, unmount } = replace(volatile).with(connect);

    mount();

    return () => unmount();
  }, [connect]);

  return [useState(), useActions()];
};

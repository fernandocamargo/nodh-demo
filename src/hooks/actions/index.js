import first from "lodash/first";
import attempt from "lodash/attempt";
import md5 from "md5";
import { v4 } from "uuid";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import stringify from "helpers/object/stringify";
import replace from "helpers/object/replace";
import Proxy from "helpers/promise/proxy";
import Declined from "helpers/error/declined";
import { NODH } from "constants/index";
import { log } from "store";
import { start, finish, clear } from "mutations";
import { volatile } from "actions";
import select from "selectors";

const proxy = new Proxy();
const instances = new Map();

export default ({ namespace, selector, actions }) => {
  const dispatch = useDispatch();
  const useState = useCallback(select({ namespace, selector }), [
    namespace,
    selector
  ]);
  const connect = useCallback(
    (path, action) => {
      const identity = md5(action);
      const location = [namespace].concat(path);
      const fingerprint = md5(JSON.stringify({ identity, location }));

      return Object.assign(
        (...params) => {
          const thread = v4();
          const typify = level =>
            `${NODH}: [${first(level)}] ${location.join(".")}(${stringify(
              params
            )});`;
          const save = path => mutation => {
            instances.has(namespace) &&
              dispatch({ type: typify(path), path, mutation });

            return fingerprint;
          };
          const conclude = type => content =>
            instances.has(namespace) &&
            log.update(finish({ [type]: content, thread }));
          const takeLatest = promise =>
            proxy.run(promise, { name: fingerprint, value: thread });
          const isDeclined = error => error instanceof Declined;
          const resources = {
            persisted: { save: save(["persisted"]) },
            volatile: { save: save(["volatile", namespace]) },
            thread: { fail: conclude("error"), success: conclude("output") },
            helpers: { takeLatest, isDeclined }
          };
          const effect = attempt(action(...params), resources);
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

    instances.set(namespace);

    mount();

    return () => {
      const {
        currentState: { namespaces }
      } = log;
      const actions = Array.from(namespaces.get(namespace));

      unmount();

      log.update(clear({ namespace }));

      proxy.clear(actions);

      instances.delete(namespace);
    };
  }, [connect, namespace]);

  return [useState(), useActions()];
};

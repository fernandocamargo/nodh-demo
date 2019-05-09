import first from "lodash/first";
import attempt from "lodash/attempt";
import md5 from "md5";
import { v4 } from "uuid";
import { useContext, useCallback, useEffect } from "react";
import { useMappedState, useDispatch } from "redux-react-hook";

import replace from "helpers/object/replace";
import { Log } from "contexts";
import NODH from "actions";
import { create, destroy } from "mutations";
import { selectVolatile } from "selectors";

const reserved = {
  mount: ({ volatile }) => () => volatile.save(create()),
  unmount: ({ volatile }) => () => volatile.save(destroy())
};

export default ({ namespace, actions }) => {
  const { register, update } = useContext(Log);
  const dispatch = useDispatch();
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
            update({ [type]: content, thread });
          const effect = attempt(
            callback({
              persisted: { save: save(["persisted"]) },
              volatile: { save: save(["volatile", namespace]) },
              thread: {
                fail: conclude("error"),
                success: conclude("output")
              }
            }),
            ...params
          );
          const loading = effect !== fingerprint;
          const asynchronous = effect instanceof Promise;

          register({ namespace, path, fingerprint, thread, params, loading });

          return asynchronous ? effect : Promise.resolve(effect);
        },
        { fingerprint }
      );
    },
    [namespace, dispatch, register, update]
  );

  useEffect(() => {
    const { mount, unmount } = replace(reserved).with(connect);

    mount();

    return () => unmount();
  }, [connect]);

  return [
    useMappedState(selectVolatile(namespace)),
    replace(actions).with(connect)
  ];
};

import first from "lodash/first";
import md5 from "md5";
import { v4 } from "uuid";
import { useCallback, useEffect } from "react";
import { useMappedState, useDispatch } from "redux-react-hook";

import replace from "helpers/object/replace";
import NODH from "actions";
import * as mutations from "mutations/volatile";
import { selectVolatile } from "selectors";

const mock = label => (...params) => {};

const reserved = {
  create: ({ volatile }) => () => volatile.save(mutations.create()),
  destroy: ({ volatile }) => () => volatile.save(mutations.destroy())
};

export default ({ namespace, actions }) => {
  const dispatch = useDispatch();
  // const { register } = useContext(Log);
  const connect = useCallback(
    (path, action) => (...params) => {
      const location = [namespace].concat(path).join(".");
      const fingerprint = md5(
        JSON.stringify({ action: md5(action), location })
      );
      const thread = v4();
      const typify = level => `${NODH}: [${level}] ${location}();`;
      const save = path => mutation =>
        dispatch({ type: typify(first(path)), path, mutation });
      const effect = action({
        persisted: { save: save(["persisted"]) },
        volatile: { save: save(["volatile", namespace]) },
        thread: {
          fail: mock("thread.fail"),
          success: mock("thread.success")
        }
      })(...params);
      const asynchronous = effect instanceof Promise;

      console.log({ fingerprint, thread });

      // register({ action: fingerprint, path, thread, params });

      return asynchronous ? effect : Promise.resolve(effect);
    },
    // [namespace, dispatch, register]
    [namespace, dispatch]
  );

  useEffect(() => {
    const { create, destroy } = replace(reserved).with(connect);

    create();

    return () => destroy();
  }, [connect]);

  return [
    useMappedState(selectVolatile(namespace)),
    replace(actions).with(connect)
  ];
};

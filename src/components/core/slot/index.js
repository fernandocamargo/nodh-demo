import md5 from "md5";
import { useCallback } from "react";
import { useMappedState, useDispatch } from "redux-react-hook";

export const getStateBy = namespace => state => ({
  session: state.session,
  temp: state.temp[namespace]
});

export const connect = ({ dispatch, state: { session, temp }, methods }) => {
  const connection = {
    session: {
      save: useCallback(
        reducer => console.log("session.save();", reducer(session)),
        [session]
      )
    },
    temp: {
      save: useCallback(reducer => console.log("temp.save();", reducer(temp)), [
        temp
      ])
    },
    thread: {
      success: useCallback(
        (...params) => console.log("thread.success();", ...params),
        []
      ),
      fail: useCallback(
        (...params) => console.log("thread.fail();", ...params),
        []
      )
    }
  };
  const rebuild = useCallback(
    (stack, [key, value]) =>
      Object.assign(stack, {
        [key]: useCallback(
          (...params) => console.log(md5(value)) || value(...params),
          []
        )
      }),
    [methods]
  );

  return Object.entries(methods(connection)).reduce(rebuild, {});
};

export default (namespace, methods) => {
  const dispatch = useDispatch();
  const selectors = useCallback(getStateBy(namespace), [namespace]);
  const state = useMappedState(selectors);

  return [state, connect({ dispatch, state, methods })];
};

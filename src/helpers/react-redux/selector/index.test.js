import React from "react";
import { renderHook } from "react-hooks-testing-library";

import { NODH } from "constants/index";
import { getInitialState } from "reducers";
import { Provider } from "components/core";

import useSelector from ".";

const Mock = props => <Provider name={NODH} {...props} />;

test("Something...", () => {
  const selector = ({ persisted, session, volatile }) => ({
    persisted,
    session,
    volatile
  });
  const {
    result: { current }
  } = renderHook(() => useSelector(selector), { wrapper: Mock });
  const expected = getInitialState();

  expect(current).toStrictEqual(expected);
});

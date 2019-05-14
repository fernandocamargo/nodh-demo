import isEqual from "lodash/isEqual";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

const getShallowMemoizedSelector = selector => {
  let latestResult;

  return state => {
    const result = selector(state);

    return (latestResult = isEqual(result, latestResult)
      ? latestResult
      : result);
  };
};

const useObjectSelector = selector => {
  const memoizedSelector = useMemo(() => getShallowMemoizedSelector(selector), [
    selector
  ]);

  return useSelector(memoizedSelector);
};

export default ({ namespace, selector }) => () =>
  useObjectSelector(
    createSelector(
      ({ persisted }) => persisted,
      ({ session }) => session,
      ({ volatile: { [namespace]: volatile = {} } }) => volatile,
      (persisted, session, volatile) =>
        selector({ persisted, session, volatile })
    )
  );

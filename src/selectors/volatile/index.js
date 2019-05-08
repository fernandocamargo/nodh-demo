import { useCallback } from "react";
import { createSelector } from "reselect";

const selectVolatile = ({ volatile }) => volatile;

export default namespace => {
  const selectNamespace = useCallback(volatile => volatile[namespace] || {}, [
    namespace
  ]);

  return createSelector(
    selectVolatile,
    selectNamespace
  );
};

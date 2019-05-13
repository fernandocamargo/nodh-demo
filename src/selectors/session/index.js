import { createSelector } from "reselect";

const selectSession = ({ session }) => session;

export default selector =>
  createSelector(
    selectSession,
    selector
  );

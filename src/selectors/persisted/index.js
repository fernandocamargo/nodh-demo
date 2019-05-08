import { createSelector } from "reselect";

const selectPersisted = ({ persisted }) => persisted;

export default selector =>
  createSelector(
    selectPersisted,
    selector
  );

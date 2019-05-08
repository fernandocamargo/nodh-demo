import update from "immutability-helper";

import unfold from "helpers/immutability-helper/unfold";

export const create = () => state => update(state, { $set: {} });

export const destroy = () => state =>
  console.log(state) || update(state, { $unset: null });

export const set = ({ path, value }) => state =>
  update(state, unfold(path, value));

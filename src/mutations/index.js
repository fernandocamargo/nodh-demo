import noop from "lodash/noop";
import update from "immutability-helper";

import unfold from "helpers/immutability-helper/unfold";

export const create = () => state => update(state, { $set: {} });

export const destroy = () => state => update(state, { $apply: noop });

export const set = ({ path, value }) => state =>
  update(state, unfold(path, value));

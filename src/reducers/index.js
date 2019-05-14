import get from "lodash/get";
import attempt from "lodash/attempt";

import NODH from "constants/core";
import { set } from "mutations";

const getInitialState = () => ({ persisted: {}, session: {}, volatile: {} });

export default () => (state = getInitialState(), { type, path, mutation }) => {
  switch (true) {
    case String(type).startsWith(NODH):
      return attempt(set({ path, value: mutation(get(state, path)) }), state);
    default:
      return state;
  }
};

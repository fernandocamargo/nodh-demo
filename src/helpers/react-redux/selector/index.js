import { useMemo } from "react";
import { useSelector } from "react-redux";

import Cache from "helpers/object/cache";

const memoize = selector => {
  const cache = new Cache();

  return state => cache.update(selector(state));
};

export default selector => {
  const cache = useMemo(() => memoize(selector), [selector]);

  return useSelector(cache);
};

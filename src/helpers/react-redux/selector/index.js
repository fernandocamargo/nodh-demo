import isEqual from "lodash/isEqual";
import { useMemo } from "react";
import { useSelector } from "react-redux";

class Cache {
  constructor() {
    this.current = null;
  }

  update(next) {
    const { current } = this;

    return (this.current = isEqual(current, next) ? current : next);
  }
}

const memoize = selector => {
  const cache = new Cache();

  return state => cache.update(selector(state));
};

export default selector => {
  const cache = useMemo(() => memoize(selector), [selector]);

  return useSelector(cache);
};

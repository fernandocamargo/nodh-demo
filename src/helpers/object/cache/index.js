import isEqual from "lodash/isEqual";

export default class {
  constructor(current) {
    this.current = current;
  }

  update(next) {
    const { current } = this;

    return (this.current = isEqual(current, next) ? current : next);
  }
}

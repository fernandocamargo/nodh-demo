import isEqual from "lodash/isEqual";

import Declined from "helpers/error/declined";

export default class {
  constructor() {
    this.instances = new Map();
  }

  run(promise, meta) {
    const { instances } = this;
    const { name, value } = meta;

    this.instances = instances.set(name, value);

    return promise.then(this.check(meta));
  }

  check({ name, value }) {
    return response => {
      const { instances, reject, resolve } = this;
      const instance = instances.get(name);
      const skip = !isEqual(value, instance);

      return skip ? reject(response) : resolve(response);
    };
  }

  resolve(response) {
    return Promise.resolve(response);
  }

  reject(response) {
    return Promise.reject(new Declined(response));
  }

  remove(name) {
    this.instances.delete(name);
  }

  clear(names) {
    const { remove } = this;

    return names.forEach(remove.bind(this));
  }
}

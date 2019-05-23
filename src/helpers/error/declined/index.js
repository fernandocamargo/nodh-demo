export default class extends Error {
  constructor(stack) {
    super();

    this.stack = stack;
  }
}

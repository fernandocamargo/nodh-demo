export default class {
  constructor() {
    this.cycles = 0;
  }

  count() {
    return (this.cycles += 1);
  }

  reset() {
    return (this.cycles = 0);
  }
}

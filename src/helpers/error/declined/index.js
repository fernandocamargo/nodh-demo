export default class extends Error {
  constructor(promise) {
    super();

    this.name = "Declined";
    this.message = "This promise was declined";
    this.promise = promise;

    Error.captureStackTrace(this, this.constructor);
  }
}

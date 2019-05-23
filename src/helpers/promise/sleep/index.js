import sample from "lodash/sample";

export default ({ duration, response }) =>
  new Promise((resolve, reject) => {
    const success = sample([true, false]);
    const getResult = () =>
      success ? resolve(response || duration) : reject("Nope");

    return window.setTimeout(getResult, duration);
  });

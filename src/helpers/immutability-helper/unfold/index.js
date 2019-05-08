export default (path, value) =>
  path
    .reverse()
    .reduce((stack, fragment) => ({ [fragment]: stack }), { $set: value });

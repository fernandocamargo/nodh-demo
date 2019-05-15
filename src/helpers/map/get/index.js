import get from "lodash/get";

export default (map, [property, ...path], defaultValue) =>
  get(map.get(property), path, defaultValue);

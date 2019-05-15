import get from "lodash/get";
import isMap from "lodash/isMap";

export default (map, path, defaultValue) =>
  !Array.isArray(path)
    ? map
    : path.reduce(
        (stack, fragment) =>
          isMap(stack) ? stack.get(fragment) : get(stack, fragment),
        map
      ) || defaultValue;

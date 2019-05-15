import isFunction from "lodash/isFunction";

const replace = (object, path = []) => ({
  with: replacement => {
    const dig = (stack, [key, value]) => {
      const deep = !!Object.keys(value).length;
      const location = path.concat(key);

      return Object.assign(stack, {
        [key]: deep
          ? replace(value, location).with(replacement)
          : replacement(location, value)
      });
    };

    return !isFunction(replacement)
      ? object
      : Object.entries(object).reduce(dig, {});
  }
});

export default replace;

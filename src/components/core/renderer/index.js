import isFunction from "lodash/isFunction";
import property from "lodash/property";
import { memo, createElement } from "react";

const create = component => props => createElement(component, props);

export default memo(({ children }) => {
  const format = isFunction(children) ? create : property("children");

  return format(children);
});

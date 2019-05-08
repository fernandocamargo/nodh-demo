import isFunction from "lodash/isFunction";
import { memo, createElement } from "react";

const create = component => props => createElement(component, props);

const pass = ({ children }) => children;

export default memo(({ children }) => {
  const format = isFunction(children) ? create : pass;

  return format(children);
});

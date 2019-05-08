import isFunction from "lodash/isFunction";
import property from "lodash/property";
import { memo } from "react";

import render from "helpers/react/render";

export default memo(({ children }) => {
  const format = isFunction(children) ? render : property("children");

  return format(children);
});

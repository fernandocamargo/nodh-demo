import { string, node } from "prop-types";

export const displayName = "NODH";

export const propTypes = {
  name: string.isRequired,
  children: node.isRequired
};

export const defaultProps = {};

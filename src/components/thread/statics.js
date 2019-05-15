import { number, any } from "prop-types";

export const displayName = "Thread";

export const propTypes = {
  begin: number,
  end: number,
  error: any,
  output: any
};

export const defaultProps = {};

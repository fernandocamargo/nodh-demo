import { number, string, bool, func } from "prop-types";

export const displayName = "Repo";

export const propTypes = {
  id: number.isRequired,
  name: string.isRequired,
  full_name: string.isRequired,
  description: string.isRequired,
  html_url: string.isRequired,
  liked: bool.isRequired,
  like: func.isRequired
};

export const defaultProps = {};

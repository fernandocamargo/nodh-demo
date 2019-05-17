import isEqual from "lodash/isEqual";

export const TESTING = isEqual(process.env.NODE_ENV, "test");

export const NODH = "🧠";

export const EMPTY_LOG = [{}];

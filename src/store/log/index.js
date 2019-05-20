import { Store } from "pullstate";

export default new Store({
  namespaces: new Map(),
  actions: new Map(),
  threads: new Map()
});

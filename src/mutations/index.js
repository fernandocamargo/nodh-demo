import noop from "lodash/noop";
import update from "immutability-helper";

import unfold from "helpers/immutability-helper/unfold";

export const mount = () => state => update(state, { $set: {} });

export const unmount = () => state => update(state, { $apply: noop });

export const set = ({ path, value }) => state =>
  update(state, unfold(path, value));

export const start = ({
  begin = performance.now(),
  fingerprint: action,
  namespace,
  path,
  thread,
  params,
  loading
}) => state =>
  update(state, {
    namespaces: {
      $apply: namespaces => {
        const actions = namespaces.has(namespace)
          ? namespaces.get(namespace)
          : new Set();

        return namespaces.set(namespace, actions.add(action));
      }
    },
    actions: {
      $apply: actions => {
        const threads = actions.has(action) ? actions.get(action).threads : [];
        const next = { threads: threads.concat(thread), namespace, path };

        return actions.set(action, next);
      }
    },
    threads: { $add: [[thread, { begin, loading, action, params }]] }
  });

export const finish = ({
  end = performance.now(),
  thread,
  output,
  error
}) => state =>
  update(state, {
    threads: {
      [thread]: {
        ...(!!output && { output: { $set: output } }),
        ...(!!error && { error: { $set: error } }),
        end: { $set: end },
        loading: { $set: false }
      }
    }
  });

export const clear = ({ namespace }) => state => {
  const namespaces = [namespace];
  const actions = [...state.namespaces.get(namespace)];
  const threads = actions.reduce(
    (stack, action) => stack.concat(state.actions.get(action).threads),
    []
  );

  return update(state, {
    namespaces: { $remove: namespaces },
    actions: { $remove: actions },
    threads: { $remove: threads }
  });
};

import random from "lodash/random";
import last from "lodash/last";
import React, { useCallback } from "react";
import { useActions, useLog } from "nodh";

import sleep from "helpers/promise/sleep";
import { Thread } from "components";

// helpers
const latency = () => random(0.5, 5) * 1000;

// async operation
const fakeRequest = response => sleep({ duration: latency(), response });

// reducers
const setName = name => state => ({ ...state, name });

const setFlag = flag => state => ({ ...state, flag });

// actions
const actions = {
  setNameFromField: name => ({
    helpers: { takeLatest, isDeclined },
    volatile,
    thread
  }) =>
    takeLatest(fakeRequest({ success: true }))
      .then(() => {
        volatile.save(setName(name));
        thread.success("Updated!");
      })
      .catch(error => {
        thread.fail(!isDeclined(error) && error);
      }),
  setFlagFromField: checked => ({ persisted, thread }) => {
    persisted.save(setFlag(checked));

    return fakeRequest({ success: true })
      .then(({ success }) => {
        thread.success("Updated!");
      })
      .catch(error => {
        persisted.save(setFlag(!checked));
        thread.fail(error);
      });
  }
};

// selector
const selector = ({
  persisted: { flag = false },
  volatile: { name = "" }
}) => ({ name, flag });

export default () => {
  const [{ name, flag }, { setNameFromField, setFlagFromField }] = useActions({
    namespace: "async",
    selector,
    actions
  });
  const nameThread = last(useLog({ action: setNameFromField }));
  const flagThread = last(useLog({ action: setFlagFromField }));
  const changeToUpdateName = useCallback(
    ({ target: { value } }) => setNameFromField(value),
    [setNameFromField]
  );
  const changeToUpdateFlag = useCallback(
    ({ target: { checked } }) => setFlagFromField(checked),
    [setFlagFromField]
  );

  return (
    <div>
      <h1>Tell us your name (fake async)</h1>
      <div>
        <p>Your name: {name}</p>
        <input defaultValue={name} onChange={changeToUpdateName} />
        {nameThread.loading && <strong> loading...</strong>}
        <Thread {...nameThread} />
      </div>
      <div>
        <h2>Optimisc update</h2>
        <label>
          <input type="checkbox" checked={flag} onChange={changeToUpdateFlag} />
          <span> some persisted flag</span>
          {flagThread.loading && <strong> loading...</strong>}
        </label>
        <Thread {...flagThread} />
      </div>
      <div>
        <h2>Undoable action</h2>
        <button>Save somethingc (you can undo within a few seconds)</button>
      </div>
    </div>
  );
};

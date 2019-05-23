import random from "lodash/random";
import last from "lodash/last";
import React, { useCallback } from "react";

import sleep from "helpers/promise/sleep";
import { useActions, useLog } from "hooks";
import Thread from "components/thread";

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
    helpers: { takeLatest, wasDeclined },
    volatile,
    thread
  }) =>
    takeLatest(fakeRequest({ success: true }))
      .then(() => {
        volatile.save(setName(name));
        thread.success("Updated!");
      })
      .catch(error => {
        thread.fail(!wasDeclined(error) && error);
      }),
  setFlagFromField: checked => ({
    helpers: { takeEarly },
    persisted,
    thread
  }) =>
    takeEarly(fakeRequest())
      .as({ success: true })
      .then(({ success }) => {
        persisted.save(setFlag(checked));
        thread.success();
      })
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
  const thread = last(useLog({ action: setNameFromField }));
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
        <Thread {...thread} />
      </div>
      <div>
        <input
          type="checkbox"
          defaultChecked={flag}
          onChange={changeToUpdateFlag}
        />
        <span> Some flag</span>
      </div>
    </div>
  );
};

import React, { memo, useCallback } from "react";

import { useActions } from "components/core";

// reducers
const setName = name => state => ({ ...state, name });

const setSize = size => state => ({ ...state, size });

// actions
const actions = {
  setNameFromField: ({ persisted, volatile }) => name => {
    persisted.save(setName(name));
    volatile.save(setSize(name.length));
  }
};

// selector
const selector = ({
  persisted: { name = "Anonymous" },
  volatile: { size = 0 }
}) => ({ name, size });

export default memo(() => {
  const [{ name, size }, { setNameFromField }] = useActions({
    namespace: "user",
    selector,
    actions
  });
  const changeToUpdateName = useCallback(
    ({ target: { value } }) => setNameFromField(value),
    [setNameFromField]
  );

  return (
    <div>
      <h1>Tell us your name</h1>
      <p>
        Your name: {name} (size: {size})
      </p>
      <input defaultValue={name} onChange={changeToUpdateName} />
    </div>
  );
});

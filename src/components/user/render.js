import React, { useCallback } from "react";

import { useActions } from "hooks";

// reducers
const setName = name => state => ({ ...state, name });

// actions
const actions = {
  setNameFromField: name => ({ persisted }) => persisted.save(setName(name))
};

// selector
const selector = ({ persisted: { name = "Anonymous" } }) => ({ name });

export default () => {
  const [{ name }, { setNameFromField }] = useActions({
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
      <p>Your name: {name}</p>
      <input defaultValue={name} onChange={changeToUpdateName} />
    </div>
  );
};

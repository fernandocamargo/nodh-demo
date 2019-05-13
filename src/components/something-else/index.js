import React, { useCallback, useEffect } from "react";

import Cycle from "helpers/react/cycle";
import { usePersisted, useVolatile } from "components/core";

// reducers
const setName = name => state => ({ ...state, name });

// actions
const actions = {
  setNameFromField: ({ persisted }) => name => persisted.save(setName(name))
};

// selectors
const selector = ({ name }) => ({ name });

const cycle = new Cycle();

export default () => {
  const { name = "Anonymous" } = usePersisted({ selector });
  const [_, { setNameFromField }] = useVolatile({
    namespace: "input-name",
    actions
  });
  const changeToUpdateName = useCallback(
    ({ target: { value } }) => setNameFromField(value),
    [setNameFromField]
  );
  useEffect(() => () => cycle.reset(), []);

  return (
    <div>
      <h1>Tell us your name (cycles: {cycle.count()})</h1>
      <p>Your name: {name}</p>
      <input onChange={changeToUpdateName} />
    </div>
  );
};

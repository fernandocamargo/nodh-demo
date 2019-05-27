import React, { useState, useCallback, Fragment } from "react";
import { Provider as Curse } from "nodh";

import { Async, Repos, User } from "components";

export default () => {
  const [mounted, setMounted] = useState(true);
  const toggleMount = useCallback(() => setMounted(status => !status), []);
  const clickToToggleMount = useCallback(() => toggleMount(), [toggleMount]);

  return (
    <Curse>
      <Fragment>
        <button onClick={clickToToggleMount}>Toggle mount</button>
        <hr />
        {!!mounted && (
          <Fragment>
            <User />
            <hr />
            <Repos />
            <hr />
            <Async />
          </Fragment>
        )}
      </Fragment>
    </Curse>
  );
};

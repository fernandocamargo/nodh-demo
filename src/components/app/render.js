import React, { useState, useCallback, Fragment } from "react";

import Curse from "components/provider";
import User from "components/user";
import Repos from "components/repos";
import Async from "components/async";

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

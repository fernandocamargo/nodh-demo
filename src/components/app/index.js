import React, { useState, useCallback, Fragment } from "react";

import { Provider as Curse } from "components/core";
import SomethingElse from "components/something-else";
import Repos from "components/repos";

export default () => {
  const [mounted, setMounted] = useState(true);
  const toggleMount = useCallback(() => setMounted(status => !status), []);
  const clickToToggleMount = useCallback(() => toggleMount(), [toggleMount]);

  return (
    <Curse>
      {!!mounted ? (
        <Fragment>
          <SomethingElse />
          <Repos onUnmount={toggleMount} />
        </Fragment>
      ) : (
        <button onClick={clickToToggleMount}>Mount</button>
      )}
    </Curse>
  );
};

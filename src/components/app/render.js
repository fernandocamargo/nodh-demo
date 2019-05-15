import React, { useState, useCallback, Fragment } from "react";

import { NODH } from "constants/index";
import { Provider as Curse } from "components/core";
import User from "components/user";
import Repos from "components/repos";

export default () => {
  const [mounted, setMounted] = useState(true);
  const toggleMount = useCallback(() => setMounted(status => !status), []);
  const clickToToggleMount = useCallback(() => toggleMount(), [toggleMount]);

  return (
    <Curse name={NODH}>
      {!!mounted ? (
        <Fragment>
          <User />
          <Repos onUnmount={toggleMount} />
        </Fragment>
      ) : (
        <button onClick={clickToToggleMount}>Mount</button>
      )}
    </Curse>
  );
};

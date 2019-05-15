import React, { useState, useCallback, Fragment } from "react";

import { name } from "package";
import { Provider as NODH } from "components/core";
import User from "components/user";
import Repos from "components/repos";

export default () => {
  const [mounted, setMounted] = useState(true);
  const toggleMount = useCallback(() => setMounted(status => !status), []);
  const clickToToggleMount = useCallback(() => toggleMount(), [toggleMount]);

  return (
    <NODH name={name}>
      {!!mounted ? (
        <Fragment>
          <User />
          <Repos onUnmount={toggleMount} />
        </Fragment>
      ) : (
        <button onClick={clickToToggleMount}>Mount</button>
      )}
    </NODH>
  );
};

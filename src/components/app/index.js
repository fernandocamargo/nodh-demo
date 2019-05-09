import React, { useState, useCallback, Fragment } from "react";

import { Provider as Curse } from "components/core";
import Demo from "components/demo";

export default () => {
  const [mounted, setMounted] = useState(true);
  const toggleMount = useCallback(() => setMounted(status => !status), []);
  const clickToToggleMount = useCallback(() => toggleMount(), [toggleMount]);

  return (
    <Curse>
      {!!mounted ? (
        <Fragment>
          <Demo onUnmount={toggleMount} />
        </Fragment>
      ) : (
        <button onClick={clickToToggleMount}>Mount</button>
      )}
    </Curse>
  );
};

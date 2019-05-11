import React, { useState, useCallback } from "react";

import { Provider as Curse } from "components/core";
import Demo from "components/demo";

export default () => {
  const [mounted, setMounted] = useState(true);
  const toggleMount = useCallback(() => setMounted(status => !status), []);
  const clickToToggleMount = useCallback(() => toggleMount(), [toggleMount]);

  return (
    <Curse>
      {!!mounted ? (
        <Demo onUnmount={toggleMount} />
      ) : (
        <button onClick={clickToToggleMount}>Mount</button>
      )}
    </Curse>
  );
};

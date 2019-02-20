import React from "react";
import { render } from "react-dom";

import { unregister } from "workers/offline";
import App from "components/app";

render(<App />, document.getElementById("root"));
unregister();

import React, { Fragment } from "react";

export default ({ begin, end, error, output }) => (
  <Fragment>
    {!!error && (
      <p style={{ color: "red" }}>
        <strong>Error: </strong>
        <em>{error}</em>
      </p>
    )}
    {!!output && <p style={{ color: "green" }}>{output}</p>}
    {!!begin && !!end && (
      <p>
        <small>Elapsed time: {end - begin} millisecond(s)</small>
      </p>
    )}
  </Fragment>
);

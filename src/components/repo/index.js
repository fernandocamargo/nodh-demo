import last from "lodash/last";
import React, { memo, useCallback } from "react";

import { useLog } from "components/core";

export default memo(
  ({ id, name, full_name, description, html_url, liked, like }) => {
    const clickToLike = useCallback(() => like(id), [like, id]);
    const { loading, error, output } = last(useLog({ action: like }, [id]));

    return (
      <dl>
        <dt>
          <a
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
            title={full_name}
          >
            {full_name}
          </a>
        </dt>
        <dd>{description}</dd>
        <dd>
          <button onClick={clickToLike} disabled={loading}>
            {!liked ? "Like" : "Dislike"} {loading && "(loading...)"}
          </button>
          {!!error && (
            <p style={{ color: "red" }}>
              <strong>Error: </strong>
              <em>{error}</em>
            </p>
          )}
          {!!output && <p style={{ color: "green" }}>{output}</p>}
        </dd>
      </dl>
    );
  }
);

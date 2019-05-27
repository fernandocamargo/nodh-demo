import last from "lodash/last";
import React, { useCallback } from "react";
import { useLog } from "nodh";

import { Thread } from "components";

export default ({
  id,
  name,
  full_name,
  description,
  html_url,
  liked,
  like
}) => {
  const clickToLike = useCallback(() => like(id), [like, id]);
  const thread = last(useLog({ action: like }, [id]));
  const { loading } = thread;

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
        <Thread {...thread} />
      </dd>
    </dl>
  );
};

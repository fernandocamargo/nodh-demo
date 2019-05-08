import { useMappedState } from "redux-react-hook";

import { selectPersisted } from "selectors";

export default ({ selector }) => useMappedState(selectPersisted(selector));

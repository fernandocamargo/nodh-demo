import { mount, unmount } from "mutations";

export default {
  mount: () => ({ volatile }) => volatile.save(mount()),
  unmount: () => ({ volatile }) => volatile.save(unmount())
};

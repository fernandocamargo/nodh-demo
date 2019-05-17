import md5 from "md5";

import { mount, unmount } from "mutations";

import actions from ".";

const save = jest.fn().mockImplementation(md5);

const mock = { volatile: { save } };

test("Expect action to save into volatile layer using mount mutation", () => {
  const action = actions.mount(mock);
  const output = action();
  const expected = md5(mount());

  expect(output).toBe(expected);
});

test("Expect action to save into volatile layer using unmount mutation", () => {
  const action = actions.unmount(mock);
  const output = action();
  const expected = md5(unmount());

  expect(output).toBe(expected);
});

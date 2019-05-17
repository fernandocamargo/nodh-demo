import md5 from "md5";

import { mount, unmount } from "mutations";

import actions from ".";

const getMock = () => {
  const save = jest.fn().mockImplementation(md5);
  const mock = { volatile: { save } };

  return { save, mock };
};

test(`
  Expect mount action to save into volatile layer using mount mutation.
`, () => {
  const { save, mock } = getMock();
  const action = actions.mount(mock);
  const output = action();
  const expected = md5(mount());

  expect(save).toHaveBeenCalled();
  expect(output).toBe(expected);
});

test(`
  Expect unmount action to save into volatile layer using unmount mutation.
`, () => {
  const { save, mock } = getMock();
  const action = actions.unmount(mock);
  const output = action();
  const expected = md5(unmount());

  expect(save).toHaveBeenCalled();
  expect(output).toBe(expected);
});

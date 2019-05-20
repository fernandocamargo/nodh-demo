import { mount, unmount } from ".";

test("Mount.", () => {
  const current = undefined;
  const next = {};
  const mutation = mount();

  expect(mutation(current)).toStrictEqual(next);
});

test("Unmount.", () => {
  const current = { foo: "bar" };
  const next = undefined;
  const mutation = unmount();

  expect(mutation(current)).toBe(next);
});

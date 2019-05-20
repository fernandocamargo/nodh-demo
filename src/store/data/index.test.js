import getStore from ".";

test("", () => {
  const [store] = getStore();

  expect(store.getState()).toStrictEqual({
    _persist: { version: -1, rehydrated: false },
    persisted: {},
    session: {},
    volatile: {}
  });
});

import get from "./";

const getMap = () =>
  new Map().set(
    "a",
    new Map().set(
      "b",
      new Map().set(
        "c",
        new Map().set(
          "d",
          new Map().set("e", { f: new Map().set("g", { h: "ijl" }) })
        )
      )
    )
  );

test("Should return the value at path of object.", () => {
  const map = getMap();
  const path = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const output = get(map, path);
  const expected = "ijl";

  expect(output).toBe(expected);
});

test("Should return the value at path of object.", () => {
  const map = getMap();
  const path = ["a", "b", "c", "d", "e", "f", "g", "h", 1];
  const output = get(map, path);
  const expected = "j";

  expect(output).toBe(expected);
});

test(`
  Should return the value at path of object. If the resolved
  value is undefined, the defaultValue is returned in its place.
  `, () => {
  const map = getMap();
  const path = ["a", "b", "c", "d", "e", "f", "g", "l"];
  const defaultValue = 123;
  const output = get(map, path, defaultValue);

  expect(output).toBe(defaultValue);
});

test("Should return the object when path isn't an array.", () => {
  const map = getMap();
  const output = get(map);

  expect(output).toStrictEqual(map);
});

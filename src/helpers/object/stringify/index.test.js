import stringify from ".";

test("Should cast an array of params into string.", () => {
  const params = [
    1,
    "lol",
    null,
    undefined,
    new Date("1995-12-17T03:24:00"),
    { foo: { bar: { zaz: "lol" } } },
    true,
    false,
    Symbol.for("lolWUT"),
    Symbol,
    () => {
      const a = 1;
      const b = a * 2;
      const c = b / 10;

      return c;
    },
    function LOL() {},
    class ROFL {},
    Number.MAX_SAFE_INTEGER,
    new Map().set("foo", new Map().set("bar", new Map().set("hueBR", "lol"))),
    new WeakMap(),
    new Set([1, 2, 3]),
    new WeakSet(),
    new ArrayBuffer(2),
    new Buffer(2),
    document.body,
    new Error("LOL"),
    Error,
    Infinity,
    -Infinity,
    NaN,
    /abc/,
    new Uint8Array()
  ];
  const output = stringify(params);
  const expected = `1, "lol", null, undefined, Date(Sun Dec 17 1995 03:24:00 GMT+0100 (CET)), { "foo": { "bar": { "zaz": "lol" } } }, true, false, Symbol(lolWUT), Function(Symbol), Function(), Function(LOL), Function(ROFL), 9007199254740991, Map(), WeakMap(), Set(), WeakSet(), ArrayBuffer(), { "type": "Buffer", "data": [ 0, 0 ] }, Element(<body>), Error: LOL, Function(Error), Infinity, -Infinity, NaN, RegExp(/abc/), Uint8Array()`;

  expect(output).toBe(expected);
});

test("Should return an empty string when the params is an empty array.", () => {
  const params = [];
  const output = stringify(params);

  expect(output).toBe("");
});

test("Should return an empty string when the params isn't an array.", () => {
  const output = stringify();

  expect(output).toBe("");
});

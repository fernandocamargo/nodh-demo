export default ({ namespace, path, params }) =>
  `${[namespace].concat(path).join(".")}(${params
    .map(param => {
      switch (true) {
        case typeof param === "string":
          return `"${param.replace(/\s+/g, " ")}"`;
        case param instanceof Date:
          return `[object Date(${param.toISOString()})]`;
        case !!param &&
          !!Object.keys(param).length &&
          typeof param !== "function":
          return JSON.stringify(param, null, 2).replace(/\s+/g, " ");
        default:
          return String(param).replace(/\s+/g, " ");
      }
    })
    .join(", ")});`;

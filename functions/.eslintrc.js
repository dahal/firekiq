module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ["google", "plugin:prettier/recommended"],
  rules: {
    quotes: ["error", "double"],
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
  },
};

module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
    "vue/setup-compiler-macros": true
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    ecmaFeatures: {
      jsx: true
    },
    parser: "@typescript-eslint/parser",
    sourceType: "module"
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"]
  },
  ignorePatterns: ["node_modules/*", "dist/*", ".vscode/*", "./swc/*", "package-lock.json"]
};

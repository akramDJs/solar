// eslint.config.cjs
const js = require("@eslint/js");
const reactPlugin = require("eslint-plugin-react");
const prettier = require("eslint-config-prettier");

module.exports = [
  // Base JS/TS rules
  {
    ...js.configs.recommended,
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
    "no-unused-vars": "off"
    },
  },

  // Prettier
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      ...prettier.rules,
    },
  },

  // Jest for test files
  {
    files: ["**/*.test.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        jest: "readonly",
        describe: "readonly",
        test: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        expect: "readonly",
      },
    },
  },
];

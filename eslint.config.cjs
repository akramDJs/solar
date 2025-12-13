import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // Recommended ESLint rules
      ...js.configs.recommended.rules,

      // React rules
      ...reactPlugin.configs.recommended.rules,
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",

      // Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Prettier
      "prettier/prettier": "warn",

      // Professional unused vars handling
      "no-unused-vars": [
        "warn", // <-- warn, don’t fail CI
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],

      // Optional: catch console logs in production
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    },
  },
];

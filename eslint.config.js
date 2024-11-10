import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      "node_modules/*",
      "dist/*",
      "pnpm-lock.yaml",
      ".git/*",
      ".husky/*",
      ".gitattributes",
      "build.cjs"
    ]
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"]
  },
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended
];

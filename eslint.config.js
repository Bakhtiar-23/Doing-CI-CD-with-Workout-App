import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";

export default defineConfig({
  overrides: [
    {
      files: ["**/*.{js,mjs,cjs}"],
      languageOptions: {
        globals: {
          ...globals.browser, // Use the browser globals
        },
      },
    },
    {
      files: ["**/*.{js,mjs,cjs}"],
      plugins: {
        js, // ESLint plugin for JavaScript (recommended rules)
      },
      extends: ["plugin:js/recommended"], // Use recommended rules for JavaScript
    },
  ],
});

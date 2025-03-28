import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig([
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
    extends: ["eslint:recommended"], // Use ESLint's built-in recommended configuration
  },
]);

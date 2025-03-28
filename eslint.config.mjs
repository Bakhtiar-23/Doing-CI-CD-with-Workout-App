export default [
    {
      ignores: ["node_modules"],
    },
    {
      files: ["**/*.js"],
      languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        globals: {
          console: "readonly", 
          module: "readonly",  
        },
      },
      rules: {
        "no-var": "error", 
        "semi": ["error", "always"],
      },
    },
  ];
  
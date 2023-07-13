module.exports = {
    extends: ['react-app','react-app/jest','plugin:import/typescript'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint','react','react-hooks'],
    root: true,
    rules: {
        "@typescript-eslint/no-unused-vars": "error",

        //https://blog.logrocket.com/12-essential-eslint-rules-react/ đọc thêm ở đây
        
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn"
    }
  };
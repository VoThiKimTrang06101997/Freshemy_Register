/* eslint-env node */
module.exports = {
    extends: ["prettier"],
    rules: {
        "prettier/prettier": ["error", { endOfLine: "auto" }],
    },
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "prettier"],
    root: true,
};

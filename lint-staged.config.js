module.exports = {
  "**/*.ts?(x)": "eslint --fix",
  "*.{js,ts,tsx,json,md,html,css,scss,less}": "prettier --write",
  "**/*.ts?(x)": () => "tsc --noEmit",
};

const path = require("path");

const rootPath = path.resolve(__dirname, "../../");

module.exports = {
  /* Path to root */
  root: rootPath,

  /* Path to source files directory */
  source: `${rootPath}/src`,

  /* Path to built files directory */
  output: `${rootPath}/build`,

  /* Path to public files directory */
  public: `${rootPath}/public`,
};

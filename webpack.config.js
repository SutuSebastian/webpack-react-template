const { merge } = require("webpack-merge");

const commonConfig = require("./config/webpack/webpack.common.config");
const startConfig = require("./config/webpack/webpack.start.config");
const buildConfig = require("./config/webpack/webpack.build.config");

module.exports = (env) => {
  if (env.WEBPACK_SERVE) return merge(commonConfig(env), startConfig);

  return merge(commonConfig(env), buildConfig);
};

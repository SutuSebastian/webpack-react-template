const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const paths = require("./paths");

module.exports = {
  mode: "production",

  output: {
    path: paths.output,
    publicPath: "/",
    filename: "js/[name].[contenthash].js",
    assetModuleFilename: "assets/[name][ext]",
    clean: true,
    sourceMapFilename: "[name].js.map",
  },

  /* Manage source maps generation process. Refer to https://webpack.js.org/configuration/devtool/#production */
  devtool: false,

  /* Optimization */
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: "all",
    },
  },

  /* Performance treshold values */
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },

  /* More details on errors */
  stats: {
    children: true,
    errorDetails: true,
  },

  /* Additional plugins */
  plugins: [
    new HTMLWebpackPlugin({
      template: `${paths.public}/index.html`,
      filename: "index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: paths.public,
          to: paths.output,
          filter: (resourcePath) => !resourcePath.endsWith("/index.html"),
        },
      ],
    }),
  ],
};

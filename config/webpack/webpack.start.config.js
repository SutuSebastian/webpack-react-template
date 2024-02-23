const ESLintPlugin = require("eslint-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const paths = require("./paths");

module.exports = {
  mode: "development",

  /* Manage source maps generation process */
  devtool: "eval-source-map",

  /* Development Server */
  devServer: {
    static: {
      directory: paths.public,
      publicPath: "/",
      watch: true,
    },
    client: {
      overlay: {
        warnings: false,
      },
    },
    compress: true,
    hot: true,
    port: 3000,
    /* Redirect all 404's to `index.html` */
    historyApiFallback: true,
  },

  output: {
    /* Required for `historyApiFallback` to work properly */
    publicPath: "/",
    sourceMapFilename: "[name].js.map",
  },

  /* File watcher options */
  watchOptions: {
    aggregateTimeout: 300,
    poll: 300,
    ignored: /node_modules/,
  },

  /* More details on errors */
  stats: {
    errorDetails: true,
  },

  /* Additional plugins */
  plugins: [
    /**
     * Serve to `index.html`
     */
    new HTMLWebpackPlugin({
      template: `${paths.public}/index.html`,
    }),
    /**
     * TS checks
     */
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: `${paths.root}/tsconfig.json`,
      },
    }),
    /**
     * ESLint checks
     */
    new ESLintPlugin({
      extensions: ["ts", "tsx"],
      threads: true,
    }),
    /**
     * Enable HMR
     */
    new ReactRefreshWebpackPlugin(),
  ],
};

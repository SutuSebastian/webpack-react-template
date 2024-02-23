const dotenv = require("dotenv");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { ProvidePlugin, DefinePlugin } = require("webpack");

const paths = require("./paths");

function getEnvData(env) {
  const rootEnvFilePath = `${paths.root}/.envs/.env`;
  const envFilePath = `${rootEnvFilePath}.${env.ENV}`;

  const rootEnvKeys = dotenv.config({ path: rootEnvFilePath }).parsed;
  const currentEnvKeys = dotenv.config({ path: envFilePath }).parsed;

  const envKeys = { ...rootEnvKeys, ...currentEnvKeys };

  return Object.keys(envKeys).reduce((prev, next) => {
    prev[next] = JSON.stringify(envKeys[next]);
    return prev;
  }, {});
}

module.exports = (env) => ({
  context: paths.source,
  entry: {
    app: "./root.tsx",
  },
  module: {
    rules: [
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: [/\.tsx?$/],
        exclude: /node_modules/,
        use: {
          loader: "swc-loader",
          options: {
            // This makes swc-loader invoke swc synchronously.
            sync: true,
            jsc: {
              parser: {
                syntax: "typescript",
              },
            },
          },
        },
      },
      {
        test: /\.(png|gif|jpe?g)$/i,
        type: "asset",
        generator: {
          filename: "images/design/[name].[hash:6][ext]",
        },
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack", "url-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    /**
     * Auto imports React from "react"
     */
    new ProvidePlugin({
      React: "react",
    }),
    /**
     * Injects `.env` variables into `process.env`
     */
    new DefinePlugin({
      "process.env": getEnvData(env),
    }),
  ],
  target: "web",
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".tsx", ".json"],
    modules: [paths.source, `${paths.root}/node_modules`],
  },
});

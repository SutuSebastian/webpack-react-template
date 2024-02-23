module.exports = {
  /**
   * Enable absolute imports
   */
  moduleDirectories: ["node_modules", "src"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": [
      "@swc/jest",
      {
        jsc: {
          parser: {
            /**
             * Enable testing for `.tsx` files
             */
            syntax: "typescript",
          },
          transform: {
            /**
             * Auto imports React from "react"
             */
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
  },
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    /**
     * Handle SVGs
     */
    "\\.svg$": "<rootDir>/config/jest/svgTransform.js",
  },
};

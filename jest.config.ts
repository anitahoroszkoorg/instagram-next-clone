const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jsdom",

  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },

  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
};

module.exports = createJestConfig(customJestConfig);

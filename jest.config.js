module.exports = {
    // testRegex: '\\.test\\.js$', // Adjust based on your test file naming convention
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testMatch: ["**/core/components/**/tests/**/*.test.js"],
  };
  
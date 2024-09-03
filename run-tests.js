// run-tests.js
const { execSync } = require('child_process');
const path = require('path');
const jest = require('jest');
const glob = require('glob');

// Parse command-line arguments
const args = process.argv.slice(2);
const componentArg = args.find(arg => arg.startsWith('--component='));
const component = componentArg ? componentArg.split('=')[1] : '';

if (!component) {
  console.error('Error: --component argument is required.');
  process.exit(1);
}
// jest core/components/${COMPONENT}/tests/**/*.test.js --config=jest.config.js --passWithNoTests
// Construct the test path
// const testPath = `core/components/${component}/tests/**/*.test.js`;
// const testFiles = glob.sync(`core/components/${component}/tests/**/*.test.js`);
// console.log(`Running tests for component: ${component}`);
// console.log(`Test path: ${testPath}`);

// // Construct the Jest command
// const jestCommand = `jest ${testPath} --config=jest.config.js`;

// // Execute the Jest command
// try {
//   execSync(jestCommand, { stdio: 'inherit' });
// } catch (error) {
//   console.error('Error running tests:', error.message);
//   process.exit(1);
// }

// Find all matching test files using glob
const testFiles = glob.sync(`core/components/${component}/tests/**/*.test.js`);

if (testFiles.length === 0) {
  console.error(`No test files found for component: ${component}`);
  process.exit(1);
}

// Construct the Jest command with the specified config
const jestCommand = `jest ${testFiles.join(' ')} --config=jest.config.js`;

try {
  execSync(jestCommand, { stdio: 'inherit' });
} catch (error) {
  console.error('Error running tests:', error.message);
  process.exit(1);
}
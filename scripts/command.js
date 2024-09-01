#!/usr/bin/env node
const {
    showHelp,
    updateComponentStatus,
    getActiveComponents,
    listComponents,
    generateComponents
} = require('../core/framework/setup/manageComponents');
// Main function to handle command-line arguments
function main() {
    console.log('ssss',  process.argv);
    const args = process.argv.slice(2);
    console.log(args);
    if (args.length === 0 || args.includes('--help')) {
        showHelp();
        return;
    }

    if (args.includes('--list')) {
        listComponents();
        return;
    }

    const componentName = args[0];
    const action = args[1];
    console.log('sssss', action);
    if (action === 'enable') {
        updateComponentStatus(componentName, true);
    } else if (action === 'disable') {
        updateComponentStatus(componentName, false);
    } else if (action === 'generate') {
        generateComponents();
    } else {
        console.log('Invalid action. Use "enable" or "disable".');
        showHelp();
    }
}

main();
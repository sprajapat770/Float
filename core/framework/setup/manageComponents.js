const fs = require('fs');
const path = require('path');
const appRoot = require('app-root-path');
const activeComponentsPath = path.join(appRoot.path, 'app', 'config', 'activeComponents.json');
const componentsDir = path.join(appRoot.path, 'core', 'components');

// Function to read active components
function getActiveComponents() {
    const rawData = fs.readFileSync(activeComponentsPath);
    return JSON.parse(rawData);
}

// Function to update the status of a component
function updateComponentStatus(componentName, isActive) {
    const components = getActiveComponents();
    if (components[componentName]) {
        components[componentName].active = isActive;
        fs.writeFileSync(activeComponentsPath, JSON.stringify(components, null, 2));
        console.log(`Component "${componentName}" status updated to ${isActive ? 'active' : 'inactive'}`);
    } else {
        console.log(`Component "${componentName}" does not exist in activeComponents.json`);
    }
}

// Function to display help
function showHelp() {
    console.log(`
    Usage: npm run manage-component <component_name> <enable|disable>
    
    Commands:
      npm run manage-component <component_name> enable       Enable the specified component
      npm run manage-component <component_name> disable      Disable the specified component
      npm run manage-component --list                       List all components and their status
      npm run manage-component --help                       Show this help message
    `);
}

// Function to list all components and their status
function listComponents() {
    const components = getActiveComponents();
    console.log("Active components status:");
    Object.keys(components).forEach((component) => {
        const status = components[component].active ? "Active" : "Inactive";
        console.log(`  - ${component}: ${status}`);
    });
}

// Function to generate or update activeComponents.json based on the directory structure
function generateComponents() {
    let existingComponentsStatus = {};

    // Check if activeComponents.json already exists
    if (fs.existsSync(activeComponentsPath)) {
        // Read existing data
        const data = fs.readFileSync(activeComponentsPath, 'utf8');
        existingComponentsStatus = JSON.parse(data);
    }

    // Read all subdirectories in core/components
    const components = fs.readdirSync(componentsDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    // Create a new object to update component statuses
    let updatedComponentsStatus = {};

    // Loop through components and update statuses
    components.forEach(component => {
        if (existingComponentsStatus[component]) {
            // If the component already exists, keep its current active status
            updatedComponentsStatus[component] = { active: true, version: '1.0.0', description: '', ...existingComponentsStatus[component] };
        } else {
            // If the component is new, set it to active: true by default
            updatedComponentsStatus[component] = { active: true, version: '1.0.0', description: '' }
        }
    });

    // Keep the existing components in the list even if they are not present in the directory
    // This ensures we don't lose track of manually deactivated components
    for (let component in existingComponentsStatus) {
        if (!updatedComponentsStatus[component]) {
            updatedComponentsStatus[component] = existingComponentsStatus[component];
        }
    }

    // Write the updated status to activeComponents.json
    fs.writeFileSync(activeComponentsPath, JSON.stringify(updatedComponentsStatus, null, 2));
    console.log('activeComponents.json has been updated based on the core/components directory.');
    const db = require("../database/config/connection");
}


module.exports = {
    listComponents,
    showHelp,
    updateComponentStatus,
    getActiveComponents,
    generateComponents
}
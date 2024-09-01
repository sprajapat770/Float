const db = require('../database/createTables');
const fs = require('fs');
const path = require('path');
const appRoot = require('app-root-path');

const coreDir = path.join(appRoot.path, 'core', 'components');

const readXmlFiles = async (sequelize, dirPath) => {
    const components = fs.readdirSync(dirPath);

    for (const component of components) {
        const schemaDir = path.join(dirPath, component, 'schema');
        if (fs.existsSync(schemaDir)) {
            const xmlFiles = fs.readdirSync(schemaDir).filter(file => file.endsWith('.xml'));

            for (const file of xmlFiles) {
                const xmlFilePath = path.join(schemaDir, file);
                // const xmlFilePath = path.join(__dirname, 'schema.xml');
                // const xmlFilePath = appRoot.resolve('core/components/catalog/database.xml');
                const xmlContent = fs.readFileSync(xmlFilePath, 'utf8');
                db(sequelize, xmlContent);
            }
        }
    }
};




module.exports = (sequelize) => {
    // call the function to parse XML and create the table
    readXmlFiles(sequelize, coreDir);
 };
const db = require('../database/createTables');
const fs = require('fs');
const path = require('path');
const appRoot = require('app-root-path');
const {validateSchemas} = require('../validator/SchemaValidator');

const coreDir = path.join(appRoot.path, 'core', 'components');
const schemaDir = path.join(appRoot.path, 'core', 'framework', 'schemas');

const readXmlFiles = async (sequelize, dirPath) => {
    console.log('xml reading');
    const components = fs.readdirSync(dirPath);

    for (const component of components) {
        // Database Setup
        const xmldDir = path.join(dirPath, component, 'schema');
        if (fs.existsSync(xmldDir)) {
            // create & update databases
            const xmlFiles = fs.readdirSync(xmldDir).filter(file => file.endsWith('.xml'));
            const dbXsdFile = path.join(schemaDir, 'database.xsd'); 
            //fs.readdirSync(schemaDir).filter(file => );
            console.log('dbXsdFile', dbXsdFile);
            for (const file of xmlFiles) {
                const xmlFilePath = path.join(xmldDir, file);
                if(validateSchemas(dbXsdFile, xmlFilePath)) {
                    console.log('create db tables')
                    // const xmlFilePath = path.join(__dirname, 'schema.xml');
                    // const xmlFilePath = appRoot.resolve('core/components/catalog/database.xml');
                    const xmlContent = fs.readFileSync(xmlFilePath, 'utf8');
                    db(sequelize, xmlContent);
                }
               
            }
        }
    }
};




module.exports = (sequelize) => {
    // call the function to parse XML and create the table
    readXmlFiles(sequelize, coreDir);
 };
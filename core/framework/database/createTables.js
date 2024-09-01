// import the necessary modules
// const fs = require('fs');
// const path = require('path');
const xml2js = require('xml2js');
const { DataTypes } = require('sequelize');
// const db = require('./config/connection');
// const appRoot = require('app-root-path');
// read XML file
// const xmlFilePath = path.join(__dirname, 'schema.xml');
// const xmlFilePath = appRoot.resolve('core/components/catalog/database.xml');
// const xmlContent = fs.readFileSync(xmlFilePath, 'utf8');
// const xml = appRoot.resolve('core/components/catalog/database.xml');

// function to parse XML and create Sequelize model
function parseXmlAndCreateTable(sequelize, xmlData) {
    xml2js.parseString(xmlData, (err, result) => {
        if (err) {
            console.error('Error parsing XML:', err);
            return;
        }

        const table = result.schema.table[0]; // Assuming there's one table defined
        const tableName = table.$.name;
        const columns = table.column;

        const modelAttributes = {};

        // iterate over each column in XML and define attributes for Sequelize model
        columns.forEach(column => {
            const name = column.$.name;
            const type = column.$.type.toUpperCase(); // Convert to uppercase to match Sequelize data types
            const length = column.$.length ? column.$.length.split(',').map(Number) : null;
            const allowNull = column.$.nullable === 'true';
            const defaultValue = column.$.default || null;
            const comment = column.$.comment || '';

            let sequelizeType;
            switch (type) {
                case 'INT':
                    sequelizeType = DataTypes.INTEGER;
                    break;
                case 'VARCHAR':
                    sequelizeType = DataTypes.STRING(length ? length[0] : 255);
                    break;
                case 'DECIMAL':
                    sequelizeType = DataTypes.DECIMAL(length ? length[0] : 10, length ? length[1] : 2);
                    break;
                case 'DATETIME':
                    sequelizeType = DataTypes.DATE;
                    break;
                default:
                    sequelizeType = DataTypes.STRING; // Default fallback type
            }

            modelAttributes[name] = {
                type: sequelizeType,
                allowNull: allowNull,
                defaultValue: defaultValue,
                comment: comment
            };

            if (column.$.primary === 'true') {
                modelAttributes[name].primaryKey = true;
            }
        });

        // define the Sequelize model using extracted table name and attributes
        const DynamicModel = sequelize.define(tableName, modelAttributes, {
            sequelize,
            // modelName: tableName.toLowerCase(),
            tableName: tableName,
            timestamps: false, // Based on your XML, adjust accordingly
            comment: table.$.comment || ''
        });

        // synchronize the model with the database
        sequelize.sync()
            .then(() => {
                console.log(`Table "${tableName}" created successfully.`);
            })
            .catch(err => {
                console.error('Error creating table:', err);
            });
    });
}

module.exports = (sequelize, xmlContent) => {
   // call the function to parse XML and create the table
    parseXmlAndCreateTable(sequelize, xmlContent);
};
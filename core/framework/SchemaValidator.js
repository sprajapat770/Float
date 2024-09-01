const fs = require('fs');
const path = require('path');
const libxmljs = require('libxmljs2');

const appRoot = require('app-root-path');

const xml = fs.readFileSync(appRoot.resolve('core/components/catalog/database.xml'), 'utf8');
const xsd = fs.readFileSync(appRoot.resolve('core/framework/schemas/database.xsd'), 'utf8');

const xmlDoc = libxmljs.parseXml(xml);
const xsdDoc = libxmljs.parseXml(xsd);

const isValid = xmlDoc.validate(xsdDoc);

if (isValid) {
    console.log('XML is valid');
} else {
    console.log('XML is not valid');
    console.log(xmlDoc.validationErrors);
}

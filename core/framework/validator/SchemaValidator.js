const fs = require('fs');
const path = require('path');
const libxmljs = require('libxmljs2');

const appRoot = require('app-root-path');

function validateSchemas(xsdPath, xmlPath) {
    console.log('xmlPath', xmlPath);
    const xml = fs.readFileSync(xmlPath, 'utf8');
    const xsd = fs.readFileSync(xsdPath, 'utf8');
    
    const xmlDoc = libxmljs.parseXml(xml);
    const xsdDoc = libxmljs.parseXml(xsd);
    
    const isValid = xmlDoc.validate(xsdDoc);
    
    if (isValid) {
        console.log('XML is valid');
        return true;
    } else {
        console.log('XML is not valid');
        console.log(xmlDoc.validationErrors);
        return false;
    }
}

module.exports = {
    // call the function to validate XML with xsd
    validateSchemas
 };
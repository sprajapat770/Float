
const productService = require('./core/components/catalog/services/productService');
const getProduct = require('./core/components/catalog/models/Product');

module.exports = async (sequelize, table) => { 
    // Establish connection and sync database
    sequelize.authenticate()
        .then(() => {
            console.log('Database connection established successfully.');
            return sequelize.sync(); // Create tables if they don't exist
        })
        .then(async () => {
            // const product = await getProduct(sequelize); 
            // Example usage of the ProductService
            return productService.createProduct(table, {
                sku: 'SKU1234',
                name: 'Sample Product',
                price: 99.99
            });
        })
        .then(product => {
            console.log('Product created:', product);
        })
        .catch(error => {
            console.error('Unable to connect to the database:', error);
        })
        .finally(() => {
            sequelize.close(); // Close the database connection
        });
}



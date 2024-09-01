class ProductService {
    async createProduct(Product, data) {
        try {
            const product = await Product.create(data);
            return product;
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    }

    async getProductById(Product, productId) {
        try {
            const product = await Product.findByPk(productId);
            return product;
        } catch (error) {
            console.error('Error fetching product:', error);
            throw error;
        }
    }

    async updateProduct(Product, productId, data) {
        try {
            const product = await Product.update(data, {
                where: { productId }
            });
            return product;
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    }


    async deleteProduct(productId) {
        try {
            const result = await Product.destroy({
                where: { productId }
            });
            return result;
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }
}

module.exports = new ProductService();


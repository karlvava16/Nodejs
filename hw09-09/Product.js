class Product {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.buffer = [];
    }

    async getAllProducts() {
        try {
            const response = await fetch(`${this.baseURL}/products`);
            const data = await response.json();
            this.buffer = data;
            console.log('Products fetched: ', this.buffer);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    async addProduct(product) {
        try {
            const response = await fetch(`${this.baseURL}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });
            const data = await response.json();
            console.log('Product added:', data);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    }

    async updateProduct(id, updatedProduct) {
        try {
            const productExists = await fetch(`${this.baseURL}/products/${id}`);
            if (!productExists.ok) {
                throw new Error(`Product with id ${id} not found.`);
            }

            const response = await fetch(`${this.baseURL}/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });

            if (!response.ok) {
                throw new Error(
                    `Error updating product: ${response.statusText}`,
                );
            }

            const data = await response.json();
            console.log('Product updated:', data);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    }

    async deleteProduct(id) {
        try {
            await fetch(`${this.baseURL}/products/${id}`, {
                method: 'DELETE',
            });
            console.log(`Product with id ${id} deleted.`);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }
    async deleteProduct(id) {
        try {
            await fetch(`${this.baseURL}/products/${id}`, {
                method: 'DELETE',
            });
            console.log(`Product with id ${id} deleted.`);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }
}

export default Product;

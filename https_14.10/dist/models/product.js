import { connectDb } from '../config/db.js';
class Product {
    getAllProducts() {
        connectDb.query('SELECT * FROM `products`', (err, res) => {
            if (err) {
                throw new Error("can't select");
            }
            return res;
        });
    }
    createProduct(product) {
        connectDb.query('SELECT * FROM `products`', [product.title, product.price], (err, res) => {
            if (err) {
                throw new Error('db error');
            }
            return res;
        });
    }
}
export default new Product();

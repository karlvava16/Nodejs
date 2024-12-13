import { connectDb } from '../config/db.js';
import { IProduct, IProductUpdateOrCreate } from '../data/products.js';
import { Express } from 'express';

class Product {
    getAllProducts(): any {
        connectDb.query('SELECT * FROM `products`', (err, res) => {
            if (err) {
                throw new Error("can't select");
            }
            return res;
        });
    }

    createProduct(product: IProductUpdateOrCreate): any {
        connectDb.query(
            'SELECT * FROM `products`',
            [product.title, product.price],
            (err, res) => {
                if (err) {
                    throw new Error('db error');
                }
                return res;
            },
        );
    }
}

export default new Product();

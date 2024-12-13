import { Request, Response, NextFunction } from 'express';
import productModel from '../models/product.js';
import { BodyType } from '../types/request-types.js';
import { IProductUpdateOrCreate } from '../data/products.js';

export class ProductController {
    getAllProducts(req: Request, res: Response, next: NextFunction): any {
        try {
            res.status(200).json(productModel.getAllProducts());
        } catch (error) {
            res.status(500).send();
        }
    }

    createProduct(
        req: BodyType<IProductUpdateOrCreate>,
        res: Response,
        next: NextFunction,
    ): any {
        try {
            productModel.createProduct(req.body);
            res.status(200).json(req.body);
        } catch (error) {
            res.status(500).send();
        }
    }
}

export default new ProductController();

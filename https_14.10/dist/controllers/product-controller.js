import productModel from '../models/product.js';
export class ProductController {
    getAllProducts(req, res, next) {
        try {
            res.status(200).json(productModel.getAllProducts());
        }
        catch (error) {
            res.status(500).send();
        }
    }
    createProduct(req, res, next) {
        try {
            productModel.createProduct(req.body);
            res.status(200).json(req.body);
        }
        catch (error) {
            res.status(500).send();
        }
    }
}
export default new ProductController();

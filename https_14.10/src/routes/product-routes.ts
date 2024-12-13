import { Router, Request, Response } from 'express';
import {
    products,
    IProduct,
    IProductUpdateOrCreate,
} from '../data/products.js';
import { title } from 'process';
import { BodyType, ParamsAndBodyType } from '../types/request-types.js';
import ProductController from '../controllers/product-controller.js';
import productController from '../controllers/product-controller.js';
const productRouter = Router();

productRouter
    .route('/')
    .get(
        ProductController.getAllProducts,
        (req: Request, res: Response<Array<IProduct>>) => {
            res.json(products);
        },
    )

    .post(productController.createProduct);

productRouter
    .route('/:id')
    .put(
        (
            req: ParamsAndBodyType<{ id: string }, IProductUpdateOrCreate>,
            res: Response<{ message: string } | IProduct>,
        ) => {
            const product = products.find(
                (el) => el.id === Number(req.params.id),
            );
            if (product) {
                product.title = req.body.title;
                product.price = req.body.price;
                res.status(201).json(product);
                return;
            }
            res.status(404).json({ message: 'product not found' });
        },
    )
    .delete(
        (req: Request<{ id: string }>, res: Response<{ message: string }>) => {
            const productIndex = products.findIndex(
                (el) => el.id === Number(req.params.id),
            );

            if (productIndex !== -1) {
                products.splice(productIndex, 1);
                res.status(200).json({
                    message: 'Product deleted successfully',
                });
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        },
    );

export default productRouter;

// type AnswerType = {
//     errors: string | null;
//     data: Array<any>;
// };

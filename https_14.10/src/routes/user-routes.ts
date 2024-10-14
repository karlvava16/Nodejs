import { Router, Request, Response } from 'express';
const productRouter = Router();

productRouter.get('/', (req: Request, res: Response) => {
    res.send('All products');
});

export default productRouter;

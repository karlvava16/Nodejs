import { Router } from 'express';
const productRouter = Router();
productRouter.get('/', (req, res) => {
    res.send('All products');
});
export default productRouter;

import { Category } from '../models/category-model';
import { Request, Response, NextFunction } from 'express';

export class CategoryController {
    static async getAllCategory(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<any> {
        const categories = Category.findAll();
        if (categories) {
            return res
                .status(200)
                .json({ message: 'All data', data: categories });
        } else {
            return res.status(500).json({ message: 'error' });
        }
    }

    static async createCategory(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<any> {}
}

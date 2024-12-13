import { Sequelize } from 'sequelize-typescript';
import { Category } from '../models/category-model';

export const connection = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    port: 3308,
    username: 'admin',
    password: 'root',
    database: 'nodejs213',
    models: [Category],
});

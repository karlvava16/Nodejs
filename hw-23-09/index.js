import express from 'express';
import bodyParser from 'body-parser';
import { productsRouter } from './routes/products.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Роутер для продуктів
app.use('/products', productsRouter);

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

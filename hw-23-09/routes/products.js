import express from 'express';

export const productsRouter = express.Router();

// Массив продуктів
let products = [
    { id: 1, name: 'Laptop', price: 1000 },
    { id: 2, name: 'Smartphone', price: 700 },
];

// Додати новий продукт
productsRouter.post('/add', (req, res) => {
    const { name, price } = req.body;
    const newProduct = { id: products.length + 1, name, price };
    products.push(newProduct);
    res.status(201).send({
        message: 'Product added successfully',
        product: newProduct,
    });
});

// Переглянути всі продукти
productsRouter.get('/view', (req, res) => {
    res.json(products);
});

// Змінити дані продукту
productsRouter.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const product = products.find((p) => p.id === parseInt(id));

    if (product) {
        product.name = name;
        product.price = price;
        res.send({ message: 'Product updated successfully', product });
    } else {
        res.status(404).send({ message: 'Product not found' });
    }
});

// Видалити продукт
productsRouter.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const index = products.findIndex((p) => p.id === parseInt(id));

    if (index !== -1) {
        const deletedProduct = products.splice(index, 1);
        res.send({
            message: 'Product deleted successfully',
            product: deletedProduct,
        });
    } else {
        res.status(404).send({ message: 'Product not found' });
    }
});

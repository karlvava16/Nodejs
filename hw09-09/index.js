import Product from './Product.js';

const product = new Product('http://localhost:3000');

product.getAllProducts();

const newProduct = { name: 'Product 4', price: 40 };
product.addProduct(newProduct);

product.deleteProduct(2);
const updatedProduct = { name: 'Updated Product 1', price: 15 };
product.updateProduct(1, updatedProduct);

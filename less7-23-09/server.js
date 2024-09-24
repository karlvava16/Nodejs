import express from 'express';
import exphbs from 'express-handlebars';
import 'dotenv/config';
import router from './routers.js';
import user_routes from './routers/user-routers.js';
import product_routes from './routers/product-routers.js';
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static('public')); //middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(router);

app.use('/products', product_routes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

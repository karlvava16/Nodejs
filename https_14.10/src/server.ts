import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';
import productRouter from './routes/product-routes.js';
import { connectDb } from './config/db.js';

const run = () => {
    // Load the SSL certificate and key
    const __dirname = import.meta.dirname;
    const options = {
        key: fs.readFileSync(path.join(__dirname, '..', 'cert', 'key.pem')),
        cert: fs.readFileSync(path.join(__dirname, '..', 'cert', 'cert.pem')),
    };

    const app = express();

    app.use(express.json());

    app.use('/products', productRouter);

    const PORT = 443;
    https.createServer(options, app).listen(PORT, () => {
        console.log(`Server is running at https://localhost:${PORT}`);
    });
};

connectDb.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        run();
    }
});

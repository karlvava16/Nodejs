import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';
// Load the SSL certificate and key
const __dirname = import.meta.dirname;
const options = {
    key: fs.readFileSync(path.join(__dirname, '..', 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '..', 'cert', 'cert.pem')),
};
const app = express();
// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, HTTPS Express world!');
});
const PORT = 443;
https.createServer(options, app).listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
});

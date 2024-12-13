import express from 'express';
import { connect } from 'http2';
import { connection } from './config/config';
const server = express();
const PORT = 3000;

server.listen(PORT, () =>
    console.log(`Server is running http://localhost: ${PORT}`),
);

connection.sync().then(() => {
    console.log('ok');
    server.listen(PORT, () => {
        console.log(`Server is running  http://localhost: ${PORT}`);
    });
});

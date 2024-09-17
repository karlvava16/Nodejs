import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import 'dotenv/config';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const pathToFile = path.join(__dirname, 'index.html');

const mimeTypes = {
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpeg': 'image/jpeg',
    '.html': 'text/html',
};

const getStaticFile = (res, filePath, ext) => {
    res.setHeader('Content-Type', mimeTypes[ext]);
    fs.readFile(path.join('.', 'public', filePath), (err, data) => {
        if (err) {
            res.statusCode = 404;
            res.end();
        } else {
            res.end(data);
        }
    });
};

const server = http.createServer((req, res) => {
    const url = req.url;
    switch (url) {
        case '/':
            if (req.method === 'GET') {
                const content = fs.readFileSync(pathToFile);
                res.setHeader('Content-Type', 'text/html');
                res.write(content);
                res.end();
            } else if (req.method === 'POST') {
                let body = '';
                req.on('data', (chunk) => {
                    body += chunk;
                });
                req.on('end', () => {
                    const newData = JSON.parse(body);

                    fs.readFile('data.json', 'utf8', (err, data) => {
                        let jsonData = [];

                        if (!err && data) {
                            jsonData = JSON.parse(data);
                        }
                        jsonData.push(newData);
                        fs.writeFile(
                            'data.json',
                            JSON.stringify(jsonData, null, 2),
                            (err) => {
                                if (err) {
                                    res.statusCode = 500;
                                    res.end('Internal Server Error');
                                } else {
                                    res.statusCode = 201;
                                    res.end('Created');
                                }
                            },
                        );
                    });
                });
            }

            break;
        case '/about':
            const aboutPage = fs.readFileSync(
                path.join(__dirname, 'about.html'),
            );
            res.setHeader('Content-Type', 'text/html');
            res.write(aboutPage);
            res.end();
            break;
        default:
            const extname = path.extname(url).toLowerCase();
            if (extname in mimeTypes) {
                getStaticFile(res, url, extname);
            } else {
                res.statusCode = 404;
                res.end();
            }
    }
});

server.listen(process.env.PORT, () => {
    console.log(`Server is running: http://localhost:${process.env.PORT}`);
});

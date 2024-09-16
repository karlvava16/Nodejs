import path from 'node:path';
import fs from 'node:fs/promises';

const __filename = import.meta.filename;

const __dirname = import.meta.dirname;

const pathToFolder = path.join(__dirname, 'files');
const pathToFile = path.join(pathToFolder, 'data.txt');

console.log(pathToFolder);
console.log(pathToFile);

const buff = Buffer.from('NODEJS Program');
fs.writeFile(pathToFile, buff)
    .then(() => {
        console.log('Файл успішно записан');
    })
    .catch((err) => console.log(err));

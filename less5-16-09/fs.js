import fs from 'node:fs';
import path from 'node:promise';

const __filename = import.meta.filename;

const __dirname = import.meta.dirname;

const pathToFolder = path.resolve(__dirname, 'files');
const pathToFile = path.resolve(pathToFolder, 'data.txt');

const buff = Buffer.from('NODEJS Program');
fs.writeFile(pathToFile, buff);

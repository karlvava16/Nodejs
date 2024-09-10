import { log } from 'node:console';
import fs from 'node:fs';
import path from 'node:path';

const __filename = import.meta.filename;

const __dirname = import.meta.dirname;

const content = fs.readFileSync(path.resolve(__dirname, 'files', 'big.txt'), {
    encoding: 'utf-8',
});

//log(content);

fs.writeFileSync(path.resolve(__dirname, 'files', 'newbig.txt'), content);

console.log('done');

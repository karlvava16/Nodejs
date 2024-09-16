import fs from 'node:fs';
import path from 'node:path';
import { Transform } from 'stream';

const __dirname = import.meta.dirname;

const file1 = path.join(__dirname, 'files', 'hello.txt');
const file2 = path.join(__dirname, 'files', 'hello2.txt');

const readStream = fs.createReadStream(file1, {
    encoding: 'utf8',
});

const writeStream = fs.createWriteStream(file2, {
    encoding: 'utf8',
});

const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        callback(null, chunk.toString().toUpperCase());
    },
});

readStream.on('data', (chunk) => {
    let i = 0;
    function printChar() {
        if (i < chunk.length) {
            process.stdout.write(chunk[i]);
            i++;
            setTimeout(printChar, 100);
        }
    }
    printChar();
});

readStream.pipe(upperCaseTransform).pipe(writeStream);

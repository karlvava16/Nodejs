import fs from 'node:fs';
import path from 'node:path';
import EventEmitter from 'node:events';

const __filename = import.meta.filename;

const __dirname = import.meta.dirname;

const emmitter = new EventEmitter();

const readStream = fs.createReadStream(
    path.resolve(__dirname, 'files', 'hello.txt'),
    {
        encoding: 'utf8',
    },
);

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

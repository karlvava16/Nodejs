import fs from 'node:fs';
import path from 'node:path';

const __filename = import.meta.filename;

const __dirname = import.meta.dirname;

const readStream = fs.createReadStream(
    path.resolve(__dirname, 'files', 'big.txt'),
);

readStream.on('data', (chunk) => {
    console.log('Start chunk...');
    console.log(chunk);
    console.log('End chunk...');
});

readStream.on('end', () => {
    console.log('|THE END|');
});

readStream.on('start', () => {
    console.log('|THE START|');
});

readStream.on('open', () => {
    console.log('|OPEN FILE|');
});

readStream.on('close', () => {
    console.log('|CLOSE FILE|');
});

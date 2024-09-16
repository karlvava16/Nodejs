import path from 'node:path';
import fs from 'node:fs';
import zlib from 'node:zlib';

const __filename = import.meta.filename;

const __dirname = import.meta.dirname;

const pathToFolder = path.join(__dirname, 'files');
const pathToFile = path.join(pathToFolder, 'data.txt');

const readStream = fs.createReadStream(pathToFile);
const writeStream = fs.createWriteStream(
    path.join(pathToFolder, 'data2.txt.gz'),
);
const transformStream = zlib.createGzip();

readStream.pipe(transformStream).pipe(writeStream);

// readStream.on('readable', () => {
//     const chunk = readStream.read();
//     console.log('\n' + 'chunk start...' + '\n');
//     console.log(chunk);
// });

// readStream.on('end', () => {
//     console.log('|--------END--------|');
// });

// readStream.on('data', (chunk) => {
//     console.log('\n' + 'chunk start...' + '\n');
//     console.log(chunk);
//     console.log(`Size: ${chunk.length}`);
//     writeStream.write(chunk);
//     console.log(`chunk end`);
//     readStream.pause();
//     setTimeout(() => {
//         readStream.resume();
//     }, 1000);
// });

// readStream.on('open', () => {
//     console.log('File was opened');
// });

// readStream.on('close', () => {
//     console.log('File was closed');
// });
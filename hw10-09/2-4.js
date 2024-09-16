// Second Task
import { Transform } from 'stream';

const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    },
});

// Third Task

const writeStream = fs.createWriteStream(
    path.resolve(__dirname, 'files', 'output.txt'),
    {
        encoding: 'utf8',
    },
);

// Forth Task
const replaceSpacesTransform = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().replace(/\s/g, '-'));
        callback();
    },
});

readStream
    .pipe(replaceSpacesTransform)
    .pipe(upperCaseTransform)
    .pipe(writeStream);

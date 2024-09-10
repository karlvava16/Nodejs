import { log } from 'node:console';
import fs from 'node:fs';
import path from 'node:path';

const __filename = import.meta.filename;

const __dirname = import.meta.dirname;

fs.readFile(path.resolve(__dirname, 'files', 'big.txt'), (err, content) => {
    if (err) {
        log(err);
        process.exit();
    }
    //log(content.toString());

    fs.writeFile(
        path.resolve(__dirname, 'files', 'big_new.txt'),
        content,
        (err) => {
            if (err) {
                log(err);
            } else {
                log('succes');
            }
        },
    );
});

console.log('done');

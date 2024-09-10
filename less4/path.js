import path from 'node:path';

const __filename = import.meta.filename;

const __dirname = import.meta.dirname;

console.log(path.sep); // \

console.log(path.extname(__filename));
console.log(path.extname(__dirname + path.sep + 'package.json'));

console.log(path.parse(__filename));
// {
//     root: 'C:\\',
//     dir: 'C:\\Step\\Nodejs\\less4',
//     base: 'index.js',
//     ext: '.js',
//     name: 'index'
// }

console.log(path.join('users', 'logs', 'log.dat')); // users\logs\log.dat

console.log(path.resolve(__dirname, './/users', 'logs'));

console.log(path.isAbsolute('./users/logs'));

console.log(path.dirname(__filename));

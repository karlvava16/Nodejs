// index.js

/*
Common JS modules
ES modules export-import
*/

// const { User, PI } = require('./User');

import { chalk } from 'chalk';
import User from './User.js';

const user = new User('Alex', 22);

console.log(chalk.blue(user.toString()));
//console.log(PI);

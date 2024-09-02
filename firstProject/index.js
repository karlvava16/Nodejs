// index.js

/*
Common JS modules
ES modules export-import
*/

// const { User, PI } = require('./User');
import User from './User.js';
import chalk from 'chalk';

const user = new User('Vlad', 20);

console.log(chalk.blue(user.toString()));

//console.log(PI);

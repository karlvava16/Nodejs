import mysql from 'mysql2';
export const connectDb = mysql.createConnection({
    host: 'localhost',
    port: 3308,
    user: 'root',
    password: 'root',
    database: 'nodejs213',
});

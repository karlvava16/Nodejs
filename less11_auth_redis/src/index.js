import express from 'express';
import exphbs from 'express-handlebars';
import cookieParser from 'cookie-parser';
import path from 'node:path';
import session from 'express-session';
import 'dotenv/config';
import siteRoutes from './routes/site-routes.js';
import userRoutes from './routes/user-routes.js';
import checkUser from './middlewars/checkuser-middleware.js';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';

const clientRedis = createClient({
    url: 'redis://127.0.0.1:6379',
});

const storeRedis = new RedisStore({
    client: clientRedis,
    prefix: 'node:session:',
    ttl: 86400, // строк життя сессії доба
});

async function run() {
    try {
        const PORT = process.env.PORT || 3000;
        //#region options for hbs
        const hbs = exphbs.create({
            defaultLayout: 'main',
            extname: 'hbs',
        });

        await clientRedis.connect();

        //#endregion
        const server = express();
        server.use(cookieParser());
        server.use(
            session({
                store: storeRedis,
                secret: process.env.SESSION_KEY,
                resave: false,
                saveUninitialized: false,
                // cookie: {
                //   maxAge: 10000,
                // },
            }),
        );
        server.use(checkUser);
        server.use(express.json());
        //#region handlebars
        server.engine('hbs', hbs.engine);
        server.set('view engine', 'hbs');
        server.set('views', path.join('src', 'views'));
        //#endregion
        server.use(express.urlencoded({ extended: true }));
        server.use(express.static('public'));

        server.use(siteRoutes);
        server.use('/user', userRoutes);
        server.listen(PORT, () =>
            console.log(`Server is running http://localhost:${PORT}`),
        );
    } catch {
        console.log('error');
    }
}

run();

import express from 'express';
import exphbs from 'express-handlebars';
import path from 'node:path';
import 'dotenv/config';
import siteRoutes from './routes/site-routes.js';
import userRoutes from './routes/user-routes.js';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs',
    partialsDir: path.join('src', 'views', 'partials'), // Add this to specify where partials are located
});

const server = express();

// Use middleware without 'server.server.use'
server.use(express.json());
server.use(cookieParser());
server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));

// Set up view engine and views directory
server.engine('hbs', hbs.engine);
server.set('view engine', 'hbs');
server.set('views', path.join('src', 'views'));

// Routes
server.use(siteRoutes);
server.use(userRoutes);

// Start server
server.listen(PORT, () =>
    console.log(`Server is running http://localhost:${PORT}`),
);

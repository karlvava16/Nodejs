// user-routes.js
import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { users } from '../data/users.js';
import { createUser } from '../middlewars/createuser-middleware.js';

const userRoutes = Router();
const SECRET_KEY = process.env.JWT_SECRET;

export const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

userRoutes.post('/api/user', (req, res) => {
    const { login, password } = req.body;
    const user = users.find((u) => u.login === login);

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid login or password' });
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
});

userRoutes.get('/api/user', authenticateJWT, (req, res) => {
    res.json(users);
});

userRoutes
    .route('/signin')
    .get((req, res) => res.render('form_auth'))
    .post((req, res) => {
        req.session.user = { login: req.body.login, email: req.body.email };
        res.redirect('/');
    });

userRoutes
    .route('/signup')
    .get((req, res) => res.render('form_register'))
    .post(createUser, (req, res) => {
        req.session.user = { login: req.body.login, email: req.body.email };
        res.redirect('/');
    });

userRoutes.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send('Failed to logout');
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});

export default userRoutes;

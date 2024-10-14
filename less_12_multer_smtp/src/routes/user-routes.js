import { Router } from 'express';
import { createUser } from '../middlewars/createuser-middleware.js';
import { users } from '../data/users.js';
import { authUser } from '../middlewars/authuser-middleware.js';
import path from 'node:path';
import multer from 'multer';
import nodemailer from 'nodemailer';

const storage = multer.diskStorage({
    destination: 'photos/',
    filename: (req, file, cb) => {
        cb(null, `${req.body.login}${path.extname(file.originalname)}`);
    },
});
const upload = multer({ storage: storage });

const userRoutes = Router();
userRoutes
    .route('/signin')
    .get((req, res) => {
        res.render('form_auth');
    })
    .post(authUser, (req, res) => {
        req.session.user = {
            login: req.body.login,
            email: req.body.email,
        };
        res.redirect('/');
    });

userRoutes.get('/', (req, res) => {
    res.json(users);
    res.end();
});

userRoutes
    .route('/signup')
    .get((req, res) => {
        res.render('form_register');
    })
    .post(upload.single('file'), createUser, (req, res) => {
        req.session.user = {
            login: req.body.login,
            email: req.body.email,
        };
        res.redirect('/');
    });
userRoutes.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});
userRoutes.get('/list', (req, res) => {
    res.render('list_of_users', { users });
});

userRoutes
    .route('/feedback')
    .get((req, res) => {
        res.render('feedback');
    })
    .post((req, res) => {
        if (req.body && req.body.email && req.body.theme && req.body.message) {
            const { email, theme, message } = req.body;
            let trans = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    user: 'vladyslav.karlinskyi@gmail.com',
                    pass: '',
                },
                tls: {
                    rejectUnauthorized: true,
                    minVersion: 'TLSv1.2',
                },
            });
            let mailOpt = {
                from: 'Vlad Karlinskyi <email>',
                to: email,
                subject: theme,
                text: message,
            };
            trans.sendMail(mailOpt, (err, info) => {
                console.log(err, info);
                if (err) {
                    result = { status: 'Error' };
                } else {
                    {
                        result = { status: 'OK' };
                    }
                }
                console.log('Result: ', result);
                res.redirect('/');
            });
        } else {
            res.redirect('/');
        }
    });

export default userRoutes;

import { Router } from 'express';
import bcrypt from 'bcrypt';
const userRoutes = Router();
userRoutes.get('/user/signin', (req, res) => {
    res.render('form_auth');
});

userRoutes.get('/user/signup', (req, res) => {
    res.render('form_register');
});

userRoutes.post('/user/signup', (req, res) => {
    console.log(bcrypt.hashSync(req.body.password, 10));
    res.cookie('user', req.body.login);
    res.redirect('/');
});
export default userRoutes;

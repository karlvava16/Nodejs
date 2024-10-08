import { users } from '../data/users.js';
import bcrypt from 'bcrypt';

export const authUser = (req, res, next) => {
    const { login, password } = req.body;
    const user = users.find((el) => el.login === login);

    // Check if the user exists and the password is correct
    if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = {
            login,
            email: user.email,
        };
        return res.redirect('/');
    }

    // If login fails, show an error message using hbs
    return res.render('form_auth', {
        error: 'Invalid login or password',
        login,
    });
};

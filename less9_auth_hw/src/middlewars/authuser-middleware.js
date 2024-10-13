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

// middleware/auth.js
export const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.sendStatus(403); // Forbidden
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }

        req.user = user;
        next();
    });
};

// Add a protected route
router.get('/profile', authenticateJWT, (req, res) => {
    res.json({ message: 'Protected route accessed', user: req.user });
});

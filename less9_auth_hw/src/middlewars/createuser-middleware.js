import { users } from '../data/users.js';
import bcrypt from 'bcrypt';
import validator from 'validator';

export const createUser = (req, res, next) => {
    const { login, email, password, confirm_password } = req.body;

    // Validate the login
    if (!validator.isAlphanumeric(login) || validator.isEmpty(login)) {
        return res.render('form_register', {
            error: 'Invalid login format',
            login,
            email,
        });
    }

    // Validate the email
    if (!validator.isEmail(email)) {
        return res.render('form_register', {
            error: 'Invalid email format',
            login,
            email,
        });
    }

    // Validate the password
    if (!validator.isLength(password, { min: 6 })) {
        return res.render('form_register', {
            error: 'Password must be at least 6 characters long',
            login,
            email,
        });
    }

    // Confirm passwords match
    if (password !== confirm_password) {
        return res.render('form_register', {
            error: 'Passwords do not match',
            login,
            email,
        });
    }

    // Check if the user already exists
    const userExists = users.find(
        (user) => user.login === login || user.email === email,
    );
    if (userExists) {
        return res.render('form_register', {
            error: 'User with this login or email already exists',
            login,
            email,
        });
    }

    // Hash the password and add the user to the array
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = {
        id: users.length + 1,
        login,
        email,
        password: hashedPassword, // Hash the password before storing
    };

    users.push(newUser); // Add the new user to the array
    req.session.user = {
        login,
        email,
    };
    res.redirect('/'); // Redirect to home after successful registration
};

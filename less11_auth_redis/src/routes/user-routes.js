import { Router } from 'express';
import bcrypt from 'bcrypt';
import { createUser } from '../middlewars/createuser-middleware.js';
import { users } from '../data/users.js';
import { authUser } from '../middlewars/authuser-middleware.js';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_EXPIRY = '15m'; // Access token expiry time
const REFRESH_TOKEN_EXPIRY = '7d'; // Refresh token expiry time

export const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRY,
    });
};

export const generateRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRY,
    });
};

const userRoutes = Router();

userRoutes
    .route('/signin')
    .get((req, res) => {
        res.render('form_auth');
    })
    .post(authUser, (req, res) => {
        const user = users.find((el) => el.login === req.body.login);

        const accessToken = generateAccessToken({
            login: user.login,
            email: user.email,
        });

        const refreshToken = generateRefreshToken({
            login: user.login,
            email: user.email,
        });

        const sessionKey = `refreshToken:${uuidv4()}`; // Unique key for Redis

        try {
            // Store refresh token with a 7-day TTL
            clientRedis.set(sessionKey, refreshToken, { EX: 7 * 24 * 60 * 60 });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

            res.json({ accessToken }); // Send access token to the client
        } catch (err) {
            console.error('Error storing refresh token in Redis:', err);
            res.sendStatus(500);
        }
    });

userRoutes
    .route('/signup')
    .get((req, res) => {
        res.render('form_register');
    })
    .post(createUser, (req, res) => {
        const user = {
            id: users.length + 1,
            login: req.body.login,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
        };
        users.push(user);
        res.redirect('/');

        //res.status(201).json({ message: 'User created successfully' });
    });

userRoutes.get('/', (req, res) => {
    res.json(users);
    res.end();
});

userRoutes.post('/refresh', async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.sendStatus(401); // Unauthorized
    }

    try {
        // Check if the refresh token exists in Redis
        const storedToken = await clientRedis.get(
            `refreshToken:${refreshToken}`,
        );

        if (!storedToken || storedToken !== refreshToken) {
            return res.sendStatus(403); // Forbidden
        }

        // Verify the refresh token and generate a new access token
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, user) => {
                if (err) return res.sendStatus(403); // Forbidden

                const newAccessToken = generateAccessToken({
                    login: user.login,
                    email: user.email,
                });

                res.json({ accessToken: newAccessToken });
            },
        );
    } catch (err) {
        console.error('Error retrieving refresh token from Redis:', err);
        res.sendStatus(500); // Internal Server Error
    }
});

userRoutes.get('/logout', async (req, res) => {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
        try {
            // Delete the refresh token from Redis
            await clientRedis.del(`refreshToken:${refreshToken}`);
        } catch (err) {
            console.error('Error deleting refresh token from Redis:', err);
        }
    }

    res.clearCookie('refreshToken');
    //res.json({ message: 'Logged out successfully' });
});

export default userRoutes;

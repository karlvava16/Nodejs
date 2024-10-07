const checkUser = (req, res, next) => {
    if (req.cookie.user) {
        res.locals.user = req.cookie.user;
    }
    next;
};

export default checkUser;

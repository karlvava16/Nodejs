import { Router } from 'express';
const siteRoutes = Router();

router.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' });
});

export default siteRoutes;

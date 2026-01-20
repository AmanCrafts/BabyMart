import express from 'express';

const router = express.Router();

router.get('/login', (_req, res) => {
    res.status(200).json({ message: 'Login route' });
});

router.get('/register', (_req, res) => {
    res.status(200).json({ message: 'Register route' });
});

router.get('/me', (_req, res) => {
    res.status(200).json({ message: 'Route to get Current User' });
});

export default router;

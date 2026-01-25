import express from 'express';

import authRoutes from '../../modules/auth/auth.routes.js';
import userRoutes from '../../modules/user/user.routes.js';

const router = express.Router();

// Health Check Endpoint
router.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'BabyMart API is running',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
    });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;

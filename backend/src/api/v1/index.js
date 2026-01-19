import express from 'express';

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

export default router;

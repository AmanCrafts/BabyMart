import express from 'express';
import {
    authenticate,
    authorizeRoles,
} from '../../middleware/auth.middleware.js';
import {
    getDashboardOverview,
    getSalesAnalytics,
    getLowStockAlerts,
    getAppMetrics,
    managePushNotifications,
} from './stats.controller.js';

const router = express.Router();

router.use(authenticate);
router.use(authorizeRoles('admin'));

router.get('/overview', getDashboardOverview);
router.get('/sales', getSalesAnalytics);
router.get('/inventory/low-stock', getLowStockAlerts);
router.get('/app-metrics', getAppMetrics);
router.post('/notifications/push', managePushNotifications);

export default router;

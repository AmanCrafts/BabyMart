import * as statsService from './stats.service.js';

export const getDashboardOverview = async (req, res) => {
    try {
        const overview = await statsService.getDashboardOverview();
        res.status(200).json({ success: true, data: overview });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getSalesAnalytics = async (req, res) => {
    try {
        const analytics = await statsService.getSalesAnalytics(
            req.query.timeRange
        );
        res.status(200).json({ success: true, data: analytics });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getLowStockAlerts = async (req, res) => {
    try {
        const threshold = req.query.threshold
            ? parseInt(req.query.threshold)
            : 10;
        const products = await statsService.getLowStockProducts(threshold);
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAppMetrics = async (req, res) => {
    try {
        const metrics = await statsService.getAppMetrics();
        res.status(200).json({ success: true, data: metrics });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const managePushNotifications = async (req, res) => {
    try {
        const result = await statsService.sendPushNotification(req.body);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

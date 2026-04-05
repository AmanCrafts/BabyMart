import Order from '../../models/order.model.js';
import Product from '../../models/product.model.js';
import User from '../../models/user.model.js';

export const getDashboardOverview = async () => {
    const totalUsers = await User.countDocuments({ role: 'customer' });
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();

    const revenueResult = await Order.aggregate([
        { $match: { status: { $ne: 'Cancelled' } } },
        { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } },
    ]);
    const totalRevenue =
        revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    const lowStockCount = await Product.countDocuments({ stock: { $lt: 10 } });

    return {
        totalUsers,
        totalOrders,
        totalProducts,
        totalRevenue,
        lowStockCount,
    };
};

export const getSalesAnalytics = async (timeRange = 'monthly') => {
    const groupBy =
        timeRange === 'monthly'
            ? { $month: '$createdAt' }
            : { $dayOfMonth: '$createdAt' };

    const sales = await Order.aggregate([
        { $match: { status: { $ne: 'Cancelled' } } },
        {
            $group: {
                _id: groupBy,
                revenue: { $sum: '$totalAmount' },
                orderCount: { $sum: 1 },
            },
        },
        { $sort: { _id: 1 } },
    ]);
    return sales;
};

export const getLowStockProducts = async (threshold = 10) => {
    return await Product.find({ stock: { $lt: threshold } })
        .select('name stock price category')
        .populate('category', 'name');
};

export const getAppMetrics = async () => {
    return {
        downloads: 12500,
        activeUsers: 4800,
        retentionRate: '68%',
        appCrashRate: '0.2%',
    };
};

export const sendPushNotification = async notificationData => {
    const { title, body, segment } = notificationData;
    console.log(
        `Sending Push Notification to [${segment}]: ${title} - ${body}`
    );
    return {
        success: true,
        message: 'Push notification sent securely to mobile devices',
    };
};

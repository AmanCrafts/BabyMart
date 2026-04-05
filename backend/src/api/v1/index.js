import express from 'express';

import authRoutes from '../../modules/auth/auth.routes.js';
import bannerRoutes from '../../modules/banner/banner.routes.js';
import brandRoutes from '../../modules/brand/brand.routes.js';
import cartRoutes from '../../modules/cart/cart.routes.js';
import categoryRoutes from '../../modules/category/category.routes.js';
import orderRoutes from '../../modules/order/order.routes.js';
import productRoutes from '../../modules/products/product.routes.js';
import userRoutes from '../../modules/user/user.routes.js';
import statsRoutes from '../../modules/stats/stats.route.js';

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
router.use('/products', productRoutes);
router.use('/brands', brandRoutes);
router.use('/banners', bannerRoutes);
router.use('/carts', cartRoutes);
router.use('/categories', categoryRoutes);
router.use('/orders', orderRoutes);
router.use('/stats', statsRoutes);

export default router;

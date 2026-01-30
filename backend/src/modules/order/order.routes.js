import express from 'express';

import {
    authenticate,
    authorizeRoles,
} from '../../middleware/auth.middleware.js';

import {
    getAllOrders,
    getOrderById,
    getUserOrders,
    createNewOrder,
    updateOrderStatus,
} from './order.controller.js';

const router = express.Router();

router
    .get('/', authenticate, authorizeRoles('admin', 'seller'), getAllOrders)
    .get('/:id', authenticate, getOrderById)
    .get('/user/:userId', authenticate, getUserOrders)
    .post('/', authenticate, createNewOrder)
    .patch(
        '/:id/status',
        authenticate,
        authorizeRoles('admin', 'seller', 'dileveryman'),
        updateOrderStatus
    );

export default router;

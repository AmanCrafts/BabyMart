import express from 'express';

import {
    authenticate,
    authorizeRoles,
} from '../../middleware/auth.middleware.js';

import {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getUserOrders,
    addUserAddress,
    updateUserAddress,
    deleteUserAddress,
} from './user.controller.js';

const router = express.Router();

// Public routes (admin only)
router.get('/', authenticate, authorizeRoles('admin'), getUser);
router.post('/', authenticate, authorizeRoles('admin'), createUser);

// User management routes (admin or own profile)
router.put('/:id', authenticate, updateUser);
router.delete('/:id', authenticate, deleteUser);

// User orders
router.get('/:id/orders', authenticate, getUserOrders);

// User address management
router.post('/:id/addresses', authenticate, addUserAddress);
router.put('/:id/addresses/:addressId', authenticate, updateUserAddress);
router.delete('/:id/addresses/:addressId', authenticate, deleteUserAddress);

export default router;

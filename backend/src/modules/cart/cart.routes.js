import express from 'express';

import { authenticate } from '../../middleware/auth.middleware.js';

import { getCart, updateCart, deleteCart } from './cart.controller.js';

const router = express.Router();

// Here assuming /:userId for straightforward testing, usually it maps to req.user.id internally via auth middleware
router
    .get('/:userId', authenticate, getCart)
    .post('/:userId', authenticate, updateCart)
    .delete('/:userId', authenticate, deleteCart);

export default router;

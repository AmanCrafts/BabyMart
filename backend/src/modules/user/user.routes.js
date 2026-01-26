import express from 'express';

import {
    authenticate,
    authorizeRoles,
} from '../../middleware/auth.middleware.js';

import { getUser, createUser } from './user.controller.js';

const router = express.Router();

// Apply authentication and authorization middleware to all user routes
router.use(authenticate, authorizeRoles('admin'));

// GET /api/users/ - Get all users (Protected)
router.get('/', authorizeRoles('admin'), getUser);
// POST /api/users/ - Create a new user
router.post('/', createUser);

export default router;

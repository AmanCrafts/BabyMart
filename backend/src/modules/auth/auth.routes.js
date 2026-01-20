import express from 'express';

import { register, login, getCurrentUser } from './auth.controller.js';

const router = express.Router();

// POST /api/auth/register - Register new user
router.post('/register', register);

// POST /api/auth/login - User login
router.post('/login', login);

// GET /api/auth/me - Get current authenticated user
router.get('/me', getCurrentUser);

export default router;

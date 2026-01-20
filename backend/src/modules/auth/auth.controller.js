import { authService } from './auth.service.js';

export async function register(req, res) {
    try {
        const { name, email, mobile, password, role } = req.body;
        const result = await authService.register({
            name,
            email,
            mobile,
            password,
            role,
        });
        res.status(201).json(result);
    } catch (error) {
        console.error('Registration Error:', error);
        const status = error.message.includes('already exists') ? 409 : 500;
        res.status(status).json({ error: error.message });
    }
}

export async function login(req, res) {
    try {
        const { identifier, password } = req.body;
        const result = await authService.login({ identifier, password });
        res.status(200).json(result);
    } catch (error) {
        console.error('Login Error:', error);
        const status = error.message.includes('invalid credentials')
            ? 401
            : 500;
        res.status(status).json({ error: error.message });
    }
}

export async function getCurrentUser(req, res) {
    try {
        const userId = req.user.id;
        const result = await authService.getCurrentUser(userId);
        res.status(200).json(result);
    } catch (error) {
        console.error('Get Current User Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

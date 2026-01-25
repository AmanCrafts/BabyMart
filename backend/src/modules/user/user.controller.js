import { fetchUsers, newUser } from './user.service.js';

export const getUser = async (_req, res) => {
    try {
        const users = await fetchUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Fetch Users Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const createUser = async (req, res) => {
    const { name, email, mobile, password, role, addresses } = req.body;
    try {
        const user = await newUser(
            name,
            email,
            mobile,
            password,
            role,
            addresses
        );
        res.status(201).json(user);
    } catch (error) {
        console.error('Create User Error:', error);
        const status = error.message.includes('already exists') ? 409 : 500;
        res.status(status).json({ error: error.message });
    }
};

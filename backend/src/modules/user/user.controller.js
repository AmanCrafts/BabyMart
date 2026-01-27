import {
    fetchUsers,
    newUser,
    modifyUser,
    removeUser,
    fetchUserOrders,
    addAddress,
    updateAddress,
    removeAddress,
} from './user.service.js';

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

export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id || req.user?.id;
        const updateData = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        // Prevent updating sensitive fields directly
        delete updateData.password; // Use separate endpoint for password change
        delete updateData._id;
        delete updateData.createdAt;
        delete updateData.updatedAt;

        const user = await modifyUser(userId, updateData);
        res.status(200).json({
            message: 'User updated successfully',
            user,
        });
    } catch (error) {
        console.error('Update User Error:', error);
        const status = error.message.includes('not found') ? 404 : 500;
        res.status(status).json({ error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id || req.user?.id;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const result = await removeUser(userId);
        res.status(200).json(result);
    } catch (error) {
        console.error('Delete User Error:', error);
        const status = error.message.includes('not found') ? 404 : 500;
        res.status(status).json({ error: error.message });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.params.id || req.user?.id;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const orders = await fetchUserOrders(userId);

        res.status(200).json({
            count: orders.length,
            orders,
        });
    } catch (error) {
        console.error('Get User Orders Error:', error);
        const status = error.message.includes('not found') ? 404 : 500;
        res.status(status).json({ error: error.message });
    }
};

export const addUserAddress = async (req, res) => {
    try {
        const userId = req.params.id || req.user?.id;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const addresses = await addAddress(userId, req.body);

        res.status(201).json({
            message: 'Address added successfully',
            addresses,
        });
    } catch (error) {
        console.error('Add User Address Error:', error);
        const status = error.message.includes('not found')
            ? 404
            : error.message.includes('required')
              ? 400
              : 500;
        res.status(status).json({ error: error.message });
    }
};

export const updateUserAddress = async (req, res) => {
    try {
        const userId = req.params.id || req.user?.id;
        const { addressId } = req.params;

        if (!userId || !addressId) {
            return res.status(400).json({
                error: 'User ID and Address ID are required',
            });
        }

        const addresses = await updateAddress(userId, addressId, req.body);

        res.status(200).json({
            message: 'Address updated successfully',
            addresses,
        });
    } catch (error) {
        console.error('Update User Address Error:', error);
        const status = error.message.includes('not found') ? 404 : 500;
        res.status(status).json({ error: error.message });
    }
};

export const deleteUserAddress = async (req, res) => {
    try {
        const userId = req.params.id || req.user?.id;
        const { addressId } = req.params;

        if (!userId || !addressId) {
            return res.status(400).json({
                error: 'User ID and Address ID are required',
            });
        }

        const addresses = await removeAddress(userId, addressId);

        res.status(200).json({
            message: 'Address deleted successfully',
            addresses,
        });
    } catch (error) {
        console.error('Delete User Address Error:', error);
        const status = error.message.includes('not found') ? 404 : 500;
        res.status(status).json({ error: error.message });
    }
};

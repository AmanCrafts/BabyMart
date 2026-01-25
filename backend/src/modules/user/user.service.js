import bcrypt from 'bcryptjs';

import {
    createUser,
    deleteUser,
    findAllUsers,
    findUserByEmail,
    findUserByEmailOrMobile,
    findUserById,
    findUserByMobile,
    updateUser,
} from './user.repository.js';

export const fetchUsers = async () => {
    try {
        const users = await findAllUsers();
        return users;
    } catch (error) {
        throw new Error(`Failed to fetch users: ${error.message}`);
    }
};

export const getUserById = async userId => {
    try {
        if (!userId) {
            throw new Error('User ID is required');
        }

        const user = await findUserById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
};

export const getUserByEmail = async email => {
    try {
        if (!email) {
            throw new Error('Email is required');
        }

        const user = await findUserByEmail(email);

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
};

export const getUserByMobile = async mobile => {
    try {
        if (!mobile) {
            throw new Error('Mobile number is required');
        }

        const user = await findUserByMobile(mobile);

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
};

export const newUser = async (
    name,
    email,
    mobile,
    password,
    role,
    addresses
) => {
    try {
        // Validate required fields
        if (!name || !email || !mobile || !password) {
            throw new Error('Name, email, mobile, and password are required');
        }

        // Check if user already exists
        const existingUser = await findUserByEmailOrMobile(email, mobile);
        if (existingUser) {
            throw new Error('User with this email or mobile already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await createUser({
            name,
            email,
            mobile,
            password: hashedPassword,
            role,
            addresses,
        });

        return user;
    } catch (error) {
        throw new Error(`Failed to create user: ${error.message}`);
    }
};

export const modifyUser = async (userId, updateData) => {
    try {
        if (!userId) {
            throw new Error('User ID is required');
        }

        if (!updateData || Object.keys(updateData).length === 0) {
            throw new Error('Update data is required');
        }

        // If password is being updated, hash it
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        // Update user
        const user = await updateUser(userId, updateData);

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        throw new Error(`Failed to update user: ${error.message}`);
    }
};

export const removeUser = async userId => {
    try {
        if (!userId) {
            throw new Error('User ID is required');
        }

        const user = await deleteUser(userId);

        if (!user) {
            throw new Error('User not found');
        }

        return { message: 'User deleted successfully', userId: user._id };
    } catch (error) {
        throw new Error(`Failed to delete user: ${error.message}`);
    }
};

import bcrypt from 'bcryptjs';

import Order from '../../models/order.model.js';

import {
    createUser,
    deleteUser,
    findAllUsers,
    findUserByEmail,
    findUserByEmailOrMobile,
    findUserById,
    findUserByMobile,
    updateUser,
    addAddressToUser,
    updateAddressInUser,
    removeAddressFromUser,
} from './user.repository.js';

export const fetchUsers = async () => {
    try {
        return await findAllUsers();
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
        return await createUser({
            name,
            email,
            mobile,
            password: hashedPassword,
            role,
            addresses,
        });
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

export const fetchUserOrders = async userId => {
    try {
        if (!userId) {
            throw new Error('User ID is required');
        }

        // Verify user exists
        const user = await findUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Fetch all orders for this user
        return await Order.find({ user: userId })
            .populate('items.product', 'name price images')
            .sort({ createdAt: -1 });
    } catch (error) {
        throw new Error(`Failed to fetch user orders: ${error.message}`);
    }
};

export const addAddress = async (userId, addressData) => {
    try {
        if (!userId) {
            throw new Error('User ID is required');
        }

        const { street, city, country, postalCode, isDefault } = addressData;

        // Validate required address fields
        if (!street || !city || !country || !postalCode) {
            throw new Error(
                'Street, city, country, and postal code are required'
            );
        }

        const addresses = await addAddressToUser(userId, {
            street,
            city,
            country,
            postalCode,
            isDefault: isDefault || false,
        });

        if (!addresses) {
            throw new Error('User not found');
        }

        return addresses;
    } catch (error) {
        throw new Error(`Failed to add address: ${error.message}`);
    }
};

export const updateAddress = async (userId, addressId, updateData) => {
    try {
        if (!userId || !addressId) {
            throw new Error('User ID and Address ID are required');
        }

        const result = await updateAddressInUser(userId, addressId, updateData);

        if (!result) {
            throw new Error('User not found');
        }

        if (result.error) {
            throw new Error(result.error);
        }

        return result;
    } catch (error) {
        throw new Error(`Failed to update address: ${error.message}`);
    }
};

export const removeAddress = async (userId, addressId) => {
    try {
        if (!userId || !addressId) {
            throw new Error('User ID and Address ID are required');
        }

        const result = await removeAddressFromUser(userId, addressId);

        if (!result) {
            throw new Error('User not found');
        }

        if (result.error) {
            throw new Error(result.error);
        }

        return result;
    } catch (error) {
        throw new Error(`Failed to delete address: ${error.message}`);
    }
};

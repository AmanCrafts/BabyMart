import bcrypt from 'bcryptjs';

import User from '../../models/user.model.js';
import { generateToken } from '../../utils/jwt.js';

export async function register(userData) {
    const { name, email, mobile, password, role } = userData;

    // Check if user with the same email or mobile already exists
    const existingUser = await User.findOne({
        $or: [{ email }, { mobile }],
    });
    if (existingUser) {
        throw new Error('User with this email or mobile already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        email,
        mobile,
        password: hashedPassword,
        role,
    });

    await newUser.save();

    return {
        message: 'User registered successfully',
        userId: newUser._id,
    };
}

export async function login({ identifier, password }) {
    // Find user by email or mobile
    const user = await User.findOne({
        $or: [{ email: identifier }, { mobile: identifier }],
    });
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = await generateToken(
        { id: user._id, email: user.email, role: user.role },
        { expiresIn: '7d' }
    );

    return {
        message: 'Login successful',
        userId: user._id,
        token,
    };
}

export async function getCurrentUser(userId) {
    const user = await User.findById(userId).select('-password');
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

export const authService = {
    register,
    login,
    getCurrentUser,
};

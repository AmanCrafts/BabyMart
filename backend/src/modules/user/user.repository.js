import User from '../../models/user.model.js';

export async function findAllUsers() {
    return await User.find().select('-password');
}

export async function findUserById(userId) {
    return await User.findById(userId).select('-password');
}

export async function findUserByEmail(email) {
    return await User.findOne({ email });
}

export async function findUserByMobile(mobile) {
    return await User.findOne({ mobile });
}

export async function findUserByEmailOrMobile(email, mobile) {
    return await User.findOne({
        $or: [{ email }, { mobile }],
    });
}

export async function createUser(userData) {
    const user = new User(userData);
    return await user.save();
}

export async function updateUser(userId, updateData) {
    return await User.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true,
    }).select('-password');
}

export async function deleteUser(userId) {
    return await User.findByIdAndDelete(userId);
}

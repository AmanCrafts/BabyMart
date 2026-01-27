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

export async function findUserByIdWithPassword(userId) {
    return await User.findById(userId);
}

export async function addAddressToUser(userId, addressData) {
    const user = await User.findById(userId);
    if (!user) return null;

    // If this address is set as default, unset other defaults
    if (addressData.isDefault) {
        user.addresses.forEach(addr => {
            addr.isDefault = false;
        });
    }

    user.addresses.push(addressData);
    await user.save();
    return user.addresses;
}

export async function updateAddressInUser(userId, addressId, updateData) {
    const user = await User.findById(userId);
    if (!user) return null;

    const address = user.addresses.id(addressId);
    if (!address) return { error: 'Address not found' };

    // If setting this as default, unset other defaults
    if (updateData.isDefault) {
        user.addresses.forEach(addr => {
            addr.isDefault = false;
        });
    }

    // Update address fields
    Object.keys(updateData).forEach(key => {
        if (updateData[key] !== undefined) {
            address[key] = updateData[key];
        }
    });

    await user.save();
    return user.addresses;
}

export async function removeAddressFromUser(userId, addressId) {
    const user = await User.findById(userId);
    if (!user) return null;

    const address = user.addresses.id(addressId);
    if (!address) return { error: 'Address not found' };

    address.deleteOne();
    await user.save();
    return user.addresses;
}

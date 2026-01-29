import Cart from '../../models/cart.model.js';

export const findByUserId = async userId => {
    return await Cart.findOne({ userId });
};

export const create = async data => {
    const cart = new Cart(data);
    return await cart.save();
};

export const updateByUserId = async (userId, data) => {
    return await Cart.findOneAndUpdate({ userId }, data, {
        new: true,
        runValidators: true,
    });
};

export const deleteByUserId = async userId => {
    return await Cart.findOneAndDelete({ userId });
};

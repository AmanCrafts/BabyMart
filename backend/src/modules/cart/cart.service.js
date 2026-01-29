import * as cartRepository from './cart.repository.js';

export const getCartByUserId = async userId => {
    const cart = await cartRepository.findByUserId(userId);
    if (!cart) throw new Error('Cart not found');
    return cart;
};

export const createOrUpdateCart = async (userId, data) => {
    const existing = await cartRepository.findByUserId(userId);
    if (existing) {
        return await cartRepository.updateByUserId(userId, data);
    }
    return await cartRepository.create({ ...data, userId });
};

export const deleteCart = async userId => {
    const deleted = await cartRepository.deleteByUserId(userId);
    if (!deleted) throw new Error('Cart not found');
    return deleted;
};

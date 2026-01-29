import * as orderRepository from './order.repository.js';

export const getAllOrders = async () => {
    return await orderRepository.findAll();
};

export const getOrderById = async id => {
    const order = await orderRepository.findById(id);
    if (!order) throw new Error('Order not found');
    return order;
};

export const getOrdersByUserId = async userId => {
    return await orderRepository.findByUserId(userId);
};

export const createNewOrder = async data => {
    return await orderRepository.create(data);
};

export const updateOrderStatus = async (id, status) => {
    const updated = await orderRepository.updateStatus(id, status);
    if (!updated) throw new Error('Order not found');
    return updated;
};

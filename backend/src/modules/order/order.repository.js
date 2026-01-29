import Order from '../../models/order.model.js';

export const findAll = async () => {
    return await Order.find().populate('user').populate('items.product');
};

export const findById = async id => {
    return await Order.findById(id).populate('user').populate('items.product');
};

export const findByUserId = async userId => {
    return await Order.find({ user: userId }).populate('items.product');
};

export const create = async data => {
    const order = new Order(data);
    return await order.save();
};

export const updateStatus = async (id, status) => {
    return await Order.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
    );
};

import * as orderService from './order.service.js';

export const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        if (error.message === 'Order not found')
            return res
                .status(404)
                .json({ success: false, message: error.message });
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const orders = await orderService.getOrdersByUserId(req.params.userId);
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createNewOrder = async (req, res) => {
    try {
        const order = await orderService.createNewOrder(req.body);
        res.status(201).json({ success: true, data: order });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const order = await orderService.updateOrderStatus(
            req.params.id,
            req.body.status
        );
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        if (error.message === 'Order not found')
            return res
                .status(404)
                .json({ success: false, message: error.message });
        res.status(400).json({ success: false, message: error.message });
    }
};

import * as cartService from './cart.service.js';

export const getCart = async (req, res) => {
    try {
        const cart = await cartService.getCartByUserId(req.params.userId); // Assuming userId is passed, later from auth req.user.id
        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        if (error.message === 'Cart not found')
            return res
                .status(404)
                .json({ success: false, message: error.message });
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateCart = async (req, res) => {
    try {
        const cart = await cartService.createOrUpdateCart(
            req.params.userId,
            req.body
        );
        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const deleteCart = async (req, res) => {
    try {
        await cartService.deleteCart(req.params.userId);
        res.status(200).json({
            success: true,
            message: 'Cart deleted successfully',
        });
    } catch (error) {
        if (error.message === 'Cart not found')
            return res
                .status(404)
                .json({ success: false, message: error.message });
        res.status(500).json({ success: false, message: error.message });
    }
};

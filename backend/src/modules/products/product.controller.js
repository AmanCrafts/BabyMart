import { uploadImageToCloudinary } from '../../utils/cloudinary.js';

import * as productService from './product.service.js';

export const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        if (error.message === 'Product not found') {
            return res
                .status(404)
                .json({ success: false, message: error.message });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getProductsByCategory = async (req, res) => {
    try {
        const products = await productService.getProductsByCategory(
            req.params.category
        );
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createNewProduct = async (req, res) => {
    try {
        let images = [];
        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file =>
                uploadImageToCloudinary(file.buffer, 'products')
            );
            const urls = await Promise.all(uploadPromises);
            images = urls.map(url => ({ url }));
        }
        const productData = { ...req.body, images };
        const product = await productService.createNewProduct(productData);
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const product = await productService.updateProduct(
            req.params.id,
            req.body
        );
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        if (error.message === 'Product not found') {
            return res
                .status(404)
                .json({ success: false, message: error.message });
        }
        res.status(400).json({ success: false, message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        await productService.deleteProduct(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
        });
    } catch (error) {
        if (error.message === 'Product not found') {
            return res
                .status(404)
                .json({ success: false, message: error.message });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

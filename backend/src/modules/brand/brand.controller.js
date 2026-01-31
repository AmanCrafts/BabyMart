import { uploadImageToCloudinary } from '../../utils/cloudinary.js';

import * as brandService from './brand.service.js';

export const getAllBrands = async (req, res) => {
    try {
        const brands = await brandService.getAllBrands();
        res.status(200).json({ success: true, data: brands });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getBrandById = async (req, res) => {
    try {
        const brand = await brandService.getBrandById(req.params.id);
        res.status(200).json({ success: true, data: brand });
    } catch (error) {
        if (error.message === 'Brand not found') {
            return res
                .status(404)
                .json({ success: false, message: error.message });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createNewBrand = async (req, res) => {
    try {
        let imageUrl = '';
        if (req.file) {
            imageUrl = await uploadImageToCloudinary(req.file.buffer, 'brands');
        }
        const brand = await brandService.createNewBrand({
            ...req.body,
            imageUrl,
        });
        res.status(201).json({ success: true, data: brand });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const updateBrand = async (req, res) => {
    try {
        let updateData = { ...req.body };
        if (req.file) {
            updateData.imageUrl = await uploadImageToCloudinary(
                req.file.buffer,
                'brands'
            );
        }
        const brand = await brandService.updateBrand(req.params.id, updateData);
        res.status(200).json({ success: true, data: brand });
    } catch (error) {
        if (error.message === 'Brand not found') {
            return res
                .status(404)
                .json({ success: false, message: error.message });
        }
        res.status(400).json({ success: false, message: error.message });
    }
};

export const deleteBrand = async (req, res) => {
    try {
        await brandService.deleteBrand(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Brand deleted successfully',
        });
    } catch (error) {
        if (error.message === 'Brand not found') {
            return res
                .status(404)
                .json({ success: false, message: error.message });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

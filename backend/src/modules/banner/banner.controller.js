import { uploadImageToCloudinary } from '../../utils/cloudinary.js';

import * as bannerService from './banner.service.js';

export const getAllBanners = async (req, res) => {
    try {
        const banners = await bannerService.getAllBanners();
        res.status(200).json({ success: true, data: banners });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getBannerById = async (req, res) => {
    try {
        const banner = await bannerService.getBannerById(req.params.id);
        res.status(200).json({ success: true, data: banner });
    } catch (error) {
        if (error.message === 'Banner not found')
            return res
                .status(404)
                .json({ success: false, message: error.message });
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createNewBanner = async (req, res) => {
    try {
        let imageUrl = '';
        if (req.file) {
            imageUrl = await uploadImageToCloudinary(
                req.file.buffer,
                'banners'
            );
        }
        const banner = await bannerService.createNewBanner({
            ...req.body,
            imageUrl,
        });
        res.status(201).json({ success: true, data: banner });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const updateBanner = async (req, res) => {
    try {
        const banner = await bannerService.updateBanner(
            req.params.id,
            req.body
        );
        res.status(200).json({ success: true, data: banner });
    } catch (error) {
        if (error.message === 'Banner not found')
            return res
                .status(404)
                .json({ success: false, message: error.message });
        res.status(400).json({ success: false, message: error.message });
    }
};

export const deleteBanner = async (req, res) => {
    try {
        await bannerService.deleteBanner(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Banner deleted successfully',
        });
    } catch (error) {
        if (error.message === 'Banner not found')
            return res
                .status(404)
                .json({ success: false, message: error.message });
        res.status(500).json({ success: false, message: error.message });
    }
};

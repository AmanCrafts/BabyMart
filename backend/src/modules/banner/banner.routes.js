import express from 'express';

import {
    authenticate,
    authorizeRoles,
} from '../../middleware/auth.middleware.js';
import { upload } from '../../middleware/upload.middleware.js';

import {
    getAllBanners,
    getBannerById,
    createNewBanner,
    updateBanner,
    deleteBanner,
} from './banner.controller.js';

const router = express.Router();

router
    .get('/', getAllBanners)
    .get('/:id', getBannerById)
    .post(
        '/',
        authenticate,
        authorizeRoles('admin', 'seller'),
        upload.single('image'),
        createNewBanner
    )
    .put(
        '/:id',
        authenticate,
        authorizeRoles('admin', 'seller'),
        upload.single('image'),
        updateBanner
    )
    .delete(
        '/:id',
        authenticate,
        authorizeRoles('admin', 'seller'),
        deleteBanner
    );

export default router;

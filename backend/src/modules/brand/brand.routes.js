import express from 'express';

import {
    authenticate,
    authorizeRoles,
} from '../../middleware/auth.middleware.js';
import { upload } from '../../middleware/upload.middleware.js';

import {
    getAllBrands,
    getBrandById,
    createNewBrand,
    updateBrand,
    deleteBrand,
} from './brand.controller.js';

const router = express.Router();

router
    .get('/', getAllBrands)
    .get('/:id', getBrandById)
    .post(
        '/',
        authenticate,
        authorizeRoles('admin', 'seller'),
        upload.single('image'),
        createNewBrand
    )
    .put(
        '/:id',
        authenticate,
        authorizeRoles('admin', 'seller'),
        upload.single('image'),
        updateBrand
    )
    .delete(
        '/:id',
        authenticate,
        authorizeRoles('admin', 'seller'),
        deleteBrand
    );

export default router;

import express from 'express';

import {
    authenticate,
    authorizeRoles,
} from '../../middleware/auth.middleware.js';

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
    .post('/', authenticate, authorizeRoles('admin', 'seller'), createNewBrand)
    .put('/:id', authenticate, authorizeRoles('admin', 'seller'), updateBrand)
    .delete(
        '/:id',
        authenticate,
        authorizeRoles('admin', 'seller'),
        deleteBrand
    );

export default router;

import express from 'express';

import {
    authenticate,
    authorizeRoles,
} from '../../middleware/auth.middleware.js';
import { upload } from '../../middleware/upload.middleware.js';

import {
    getAllProducts,
    getProductById,
    getProductsByCategory,
    createNewProduct,
    updateProduct,
    deleteProduct,
} from './product.controller.js';

const router = express.Router();

router
    .get('/', getAllProducts)
    .get('/:id', getProductById)
    .get('/category/:category', getProductsByCategory)
    .post(
        '/',
        authenticate,
        authorizeRoles('admin', 'seller'),
        upload.array('images', 5),
        createNewProduct
    )
    .put(
        '/:id',
        authenticate,
        authorizeRoles('admin', 'seller'),
        upload.array('images', 5),
        updateProduct
    )
    .delete(
        '/:id',
        authenticate,
        authorizeRoles('admin', 'seller'),
        deleteProduct
    );

export default router;

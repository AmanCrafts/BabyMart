import express from 'express';

import {
    getAllProducts,
    getProductById,
    getProductsByCategory,
    createNewProduct,
    updateProduct,
    deleteProduct,
} from './product.controller.js';
import {
    authenticate,
    authorizeRoles,
} from '../../middleware/auth.middleware.js';

const router = express.Router();

router
    .get('/', getAllProducts)
    .get('/:id', getProductById)
    .get('/category/:category', getProductsByCategory)
    .post(
        '/',
        authenticate,
        authorizeRoles('admin', 'seller'),
        createNewProduct
    )
    .put('/:id', authenticate, authorizeRoles('admin', 'seller'), updateProduct)
    .delete(
        '/:id',
        authenticate,
        authorizeRoles('admin', 'seller'),
        deleteProduct
    );

export default router;

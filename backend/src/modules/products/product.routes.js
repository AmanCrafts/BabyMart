import express from 'express';

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
    .post('/', createNewProduct)
    .put('/:id', updateProduct)
    .delete('/:id', deleteProduct);

export default router;

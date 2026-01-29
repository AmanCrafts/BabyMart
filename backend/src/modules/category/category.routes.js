import express from 'express';
import {
    getAllCategories,
    getCategoryById,
    createNewCategory,
    updateCategory,
    deleteCategory,
} from './category.controller.js';
import {
    authenticate,
    authorizeRoles,
} from '../../middleware/auth.middleware.js';

const router = express.Router();

router
    .get('/', getAllCategories)
    .get('/:id', getCategoryById)
    .post(
        '/',
        authenticate,
        authorizeRoles('admin', 'seller'),
        createNewCategory
    )
    .put(
        '/:id',
        authenticate,
        authorizeRoles('admin', 'seller'),
        updateCategory
    )
    .delete(
        '/:id',
        authenticate,
        authorizeRoles('admin', 'seller'),
        deleteCategory
    );

export default router;

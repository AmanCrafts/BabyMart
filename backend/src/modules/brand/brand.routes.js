import express from 'express';

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
    .post('/', createNewBrand)
    .put('/:id', updateBrand)
    .delete('/:id', deleteBrand);

export default router;

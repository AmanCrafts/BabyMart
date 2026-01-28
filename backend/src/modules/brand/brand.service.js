import * as brandRepository from './brand.repository.js';

export const getAllBrands = async () => {
    return await brandRepository.findAll();
};

export const getBrandById = async id => {
    const brand = await brandRepository.findById(id);
    if (!brand) throw new Error('Brand not found');
    return brand;
};

export const createNewBrand = async brandData => {
    return await brandRepository.create(brandData);
};

export const updateBrand = async (id, brandData) => {
    const updatedBrand = await brandRepository.update(id, brandData);
    if (!updatedBrand) throw new Error('Brand not found');
    return updatedBrand;
};

export const deleteBrand = async id => {
    const deletedBrand = await brandRepository.deleteById(id);
    if (!deletedBrand) throw new Error('Brand not found');
    return deletedBrand;
};

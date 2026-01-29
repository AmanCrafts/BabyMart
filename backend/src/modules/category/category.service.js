import * as categoryRepository from './category.repository.js';

export const getAllCategories = async () => {
    return await categoryRepository.findAll();
};

export const getCategoryById = async id => {
    const category = await categoryRepository.findById(id);
    if (!category) throw new Error('Category not found');
    return category;
};

export const createNewCategory = async data => {
    return await categoryRepository.create(data);
};

export const updateCategory = async (id, data) => {
    const updated = await categoryRepository.update(id, data);
    if (!updated) throw new Error('Category not found');
    return updated;
};

export const deleteCategory = async id => {
    const deleted = await categoryRepository.deleteById(id);
    if (!deleted) throw new Error('Category not found');
    return deleted;
};

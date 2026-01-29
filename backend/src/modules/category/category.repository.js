import Category from '../../models/category.model.js';

export const findAll = async () => {
    return await Category.find();
};

export const findById = async id => {
    return await Category.findById(id);
};

export const create = async data => {
    const category = new Category(data);
    return await category.save();
};

export const update = async (id, data) => {
    return await Category.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
};

export const deleteById = async id => {
    return await Category.findByIdAndDelete(id);
};

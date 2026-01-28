import Brand from '../../models/brand.model.js';

export const findAll = async () => {
    return await Brand.find();
};

export const findById = async id => {
    return await Brand.findById(id);
};

export const create = async brandData => {
    const brand = new Brand(brandData);
    return await brand.save();
};

export const update = async (id, brandData) => {
    return await Brand.findByIdAndUpdate(id, brandData, {
        new: true,
        runValidators: true,
    });
};

export const deleteById = async id => {
    return await Brand.findByIdAndDelete(id);
};

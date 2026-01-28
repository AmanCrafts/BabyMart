import Product from '../../models/product.model.js';

export const findAll = async () => {
    return await Product.find().populate('category');
};

export const findById = async id => {
    return await Product.findById(id).populate('category');
};

export const findByCategory = async categoryId => {
    return await Product.find({ category: categoryId }).populate('category');
};

export const create = async productData => {
    const product = new Product(productData);
    return await product.save();
};

export const update = async (id, productData) => {
    return await Product.findByIdAndUpdate(id, productData, {
        new: true,
        runValidators: true,
    }).populate('category');
};

export const deleteById = async id => {
    return await Product.findByIdAndDelete(id);
};

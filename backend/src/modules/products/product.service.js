import * as productRepository from './product.repository.js';

export const getAllProducts = async () => {
    return await productRepository.findAll();
};

export const getProductById = async id => {
    const product = await productRepository.findById(id);
    if (!product) throw new Error('Product not found');
    return product;
};

export const getProductsByCategory = async categoryId => {
    return await productRepository.findByCategory(categoryId);
};

export const createNewProduct = async productData => {
    return await productRepository.create(productData);
};

export const updateProduct = async (id, productData) => {
    const updatedProduct = await productRepository.update(id, productData);
    if (!updatedProduct) throw new Error('Product not found');
    return updatedProduct;
};

export const deleteProduct = async id => {
    const deletedProduct = await productRepository.deleteById(id);
    if (!deletedProduct) throw new Error('Product not found');
    return deletedProduct;
};

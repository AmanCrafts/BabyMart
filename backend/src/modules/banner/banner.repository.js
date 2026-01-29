import Banner from '../../models/banner.model.js';

export const findAll = async () => {
    return await Banner.find();
};

export const findById = async id => {
    return await Banner.findById(id);
};

export const create = async data => {
    const banner = new Banner(data);
    return await banner.save();
};

export const update = async (id, data) => {
    return await Banner.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
};

export const deleteById = async id => {
    return await Banner.findByIdAndDelete(id);
};

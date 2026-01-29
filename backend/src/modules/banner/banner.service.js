import * as bannerRepository from './banner.repository.js';

export const getAllBanners = async () => {
    return await bannerRepository.findAll();
};

export const getBannerById = async id => {
    const banner = await bannerRepository.findById(id);
    if (!banner) throw new Error('Banner not found');
    return banner;
};

export const createNewBanner = async data => {
    return await bannerRepository.create(data);
};

export const updateBanner = async (id, data) => {
    const updated = await bannerRepository.update(id, data);
    if (!updated) throw new Error('Banner not found');
    return updated;
};

export const deleteBanner = async id => {
    const deleted = await bannerRepository.deleteById(id);
    if (!deleted) throw new Error('Banner not found');
    return deleted;
};

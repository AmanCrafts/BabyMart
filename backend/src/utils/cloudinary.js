import cloudinary from '../config/cloudinary.js';

export const uploadImageToCloudinary = async (fileBuffer, folder) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: `BabyMart/${folder}` },
            (error, result) => {
                if (result) {
                    resolve(result.secure_url);
                } else {
                    reject(error);
                }
            }
        );
        stream.end(fileBuffer);
    });
};

import cloudinary from 'cloudinary';
import { config } from '../config.js';

cloudinary.v2.config({
  cloud_name: config.cloudinary.name,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

export const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.v2.uploader.upload(filePath, {
      folder: 'quiz-battle/images',
      resource_type: 'auto',
      quality: 'auto',
    });
    return result.secure_url;
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

export const uploadVideo = async (filePath) => {
  try {
    const result = await cloudinary.v2.uploader.upload(filePath, {
      folder: 'quiz-battle/videos',
      resource_type: 'video',
      quality: 'auto',
    });
    return result.secure_url;
  } catch (error) {
    throw new Error(`Cloudinary video upload failed: ${error.message}`);
  }
};

export const deleteResource = async (publicId) => {
  try {
    await cloudinary.v2.uploader.destroy(publicId);
    return true;
  } catch (error) {
    throw new Error(`Cloudinary delete failed: ${error.message}`);
  }
};

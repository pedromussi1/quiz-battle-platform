import { Category } from '../models/Category.js';

export const getAllCategories = async () => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    return categories;
  } catch (error) {
    throw error;
  }
};

export const createCategory = async (name, description = '') => {
  try {
    const slug = name.toLowerCase().replace(/\s+/g, '-');

    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      throw new Error('Category already exists');
    }

    const category = new Category({
      name,
      slug,
      description,
    });

    await category.save();
    return category;
  } catch (error) {
    throw error;
  }
};

export const getCategoryBySlug = async (slug) => {
  try {
    const category = await Category.findOne({ slug });
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  } catch (error) {
    throw error;
  }
};

import express from 'express';
import { getAllCategories, createCategory, getCategoryBySlug } from '../controllers/categoryController.js';

const router = express.Router();

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get category by slug
router.get('/:slug', async (req, res) => {
  try {
    const category = await getCategoryBySlug(req.params.slug);
    res.json(category);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Create category (admin only - simplified for MVP)
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await createCategory(name, description);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;

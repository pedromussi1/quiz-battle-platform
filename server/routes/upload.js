import express from 'express';
import multer from 'multer';
import { uploadImage, uploadVideo } from '../utils/cloudinary.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Configure multer for temporary file storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'video/mp4',
      'video/mpeg',
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});

// Upload image
router.post('/image', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Create a temporary file path
    const tempPath = `/tmp/${Date.now()}-${req.file.originalname}`;

    // For this implementation, we'll use base64 encoding
    const base64Data = req.file.buffer.toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${base64Data}`;

    const imageUrl = await uploadImage(dataURI);
    res.json({ url: imageUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upload video
router.post('/video', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const base64Data = req.file.buffer.toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${base64Data}`;

    const videoUrl = await uploadVideo(dataURI);
    res.json({ url: videoUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

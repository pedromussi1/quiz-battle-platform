import express from 'express';
import passport from 'passport';
import { handleGoogleAuth, handleDiscordAuth, getUserProfile, updateUserProfile } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';
import { config } from '../config.js';

const router = express.Router();

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  async (req, res) => {
    try {
      const { user, token } = await handleGoogleAuth(req.user);
      res.redirect(`${config.frontend.url}/auth-success?token=${token}&userId=${user._id}`);
    } catch (error) {
      res.redirect(`${config.frontend.url}/login?error=Authentication failed`);
    }
  }
);

// Discord OAuth
router.get('/discord', passport.authenticate('discord', { scope: ['identify', 'email'] }));

router.get(
  '/discord/callback',
  passport.authenticate('discord', { session: false }),
  async (req, res) => {
    try {
      const { user, token } = await handleDiscordAuth(req.user);
      res.redirect(`${config.frontend.url}/auth-success?token=${token}&userId=${user._id}`);
    } catch (error) {
      res.redirect(`${config.frontend.url}/login?error=Authentication failed`);
    }
  }
);

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await getUserProfile(req.user.userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { username, displayName } = req.body;
    const updatedUser = await updateUserProfile(req.user.userId, { username, displayName });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;

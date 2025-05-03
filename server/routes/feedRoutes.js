import express from 'express';
import { getRedditPosts, savePost } from '../controllers/feedController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/reddit', getRedditPosts);
router.post('/save', protect, savePost);

export default router;

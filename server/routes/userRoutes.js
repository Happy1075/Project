import express from 'express';
import { getUserStats, getAllUsers, editCredits } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/stats', protect, getUserStats);
router.get('/all', protect, adminOnly, getAllUsers);
router.post('/edit-credits', protect, adminOnly, editCredits);

export default router;

import { Router } from 'express';
import Leaderboard from '../models/leaderboard';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const items = await Leaderboard.find()
      .populate({ path: 'user', select: 'name email' })
      .populate({ path: 'team', select: 'name' })
      .sort({ rank: 1 })
      .lean();
    res.json({ resource: 'leaderboard', count: items.length, items });
  } catch (error) {
    res.status(500).json({ resource: 'leaderboard', error: 'Failed to fetch leaderboard', details: error });
  }
});

export default router;

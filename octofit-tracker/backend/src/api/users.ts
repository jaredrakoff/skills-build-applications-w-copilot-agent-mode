import { Router } from 'express';
import User from '../models/user';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const items = await User.find().sort({ createdAt: -1 }).lean();
    res.json({ resource: 'users', count: items.length, items });
  } catch (error) {
    res.status(500).json({ resource: 'users', error: 'Failed to fetch users', details: error });
  }
});

export default router;

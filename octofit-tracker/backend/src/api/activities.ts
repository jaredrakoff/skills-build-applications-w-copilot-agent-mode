import { Router } from 'express';
import Activity from '../models/activity';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const items = await Activity.find()
      .populate({ path: 'user', select: 'name email' })
      .populate({ path: 'team', select: 'name city' })
      .sort({ performedAt: -1 })
      .lean();
    res.json({ resource: 'activities', count: items.length, items });
  } catch (error) {
    res.status(500).json({ resource: 'activities', error: 'Failed to fetch activities', details: error });
  }
});

export default router;

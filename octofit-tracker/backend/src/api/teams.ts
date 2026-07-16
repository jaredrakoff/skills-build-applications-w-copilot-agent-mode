import { Router } from 'express';
import Team from '../models/team';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const items = await Team.find()
      .populate({ path: 'members', select: 'name email fitnessLevel' })
      .sort({ name: 1 })
      .lean();
    res.json({ resource: 'teams', count: items.length, items });
  } catch (error) {
    res.status(500).json({ resource: 'teams', error: 'Failed to fetch teams', details: error });
  }
});

export default router;

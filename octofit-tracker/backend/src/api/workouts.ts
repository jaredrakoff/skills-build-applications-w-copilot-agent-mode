import { Router } from 'express';
import Workout from '../models/workout';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const items = await Workout.find()
      .populate({ path: 'user', select: 'name email fitnessLevel' })
      .sort({ createdAt: -1 })
      .lean();
    res.json({ resource: 'workouts', count: items.length, items });
  } catch (error) {
    res.status(500).json({ resource: 'workouts', error: 'Failed to fetch workouts', details: error });
  }
});

export default router;

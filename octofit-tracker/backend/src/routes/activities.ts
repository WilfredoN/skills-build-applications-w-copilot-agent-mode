import { Router, Request, Response } from 'express';
import Activity from '../models/Activity';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const activities = await Activity.find().populate('user', 'name email').lean();
  res.json({ activities });
});

router.post('/', async (req: Request, res: Response) => {
  const { user, type, distanceKm, durationMin, calories } = req.body;
  const activity = new Activity({ user, type, distanceKm, durationMin, calories });
  await activity.save();
  res.status(201).json({ activity });
});

router.get('/:id', async (req: Request, res: Response) => {
  const activity = await Activity.findById(req.params.id).lean();
  if (!activity) return res.status(404).json({ message: 'Activity not found' });
  res.json({ activity });
});

export default router;

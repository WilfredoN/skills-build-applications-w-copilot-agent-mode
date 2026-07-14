import { Router, Request, Response } from 'express';
import Workout from '../models/Workout';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const workouts = await Workout.find().lean();
  res.json({ workouts });
});

router.post('/', async (req: Request, res: Response) => {
  const { title, description, durationMin, difficulty, exercises } = req.body;
  const workout = new Workout({ title, description, durationMin, difficulty, exercises });
  await workout.save();
  res.status(201).json({ workout });
});

router.get('/:id', async (req: Request, res: Response) => {
  const workout = await Workout.findById(req.params.id).lean();
  if (!workout) return res.status(404).json({ message: 'Workout not found' });
  res.json({ workout });
});

export default router;

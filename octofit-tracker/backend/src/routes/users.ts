import { Router, Request, Response } from 'express';
import User from '../models/User';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const users = await User.find().lean();
  res.json({ users });
});

router.post('/', async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const user = new User({ name, email });
  await user.save();
  res.status(201).json({ user });
});

router.get('/:id', async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).lean();
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ user });
});

export default router;

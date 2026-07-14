import { Router, Request, Response } from 'express';
import Team from '../models/Team';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const teams = await Team.find().lean();
  res.json({ teams });
});

router.post('/', async (req: Request, res: Response) => {
  const { name, members } = req.body;
  const team = new Team({ name, members });
  await team.save();
  res.status(201).json({ team });
});

router.get('/:id', async (req: Request, res: Response) => {
  const team = await Team.findById(req.params.id).lean();
  if (!team) return res.status(404).json({ message: 'Team not found' });
  res.json({ team });
});

export default router;

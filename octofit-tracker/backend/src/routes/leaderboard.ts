import { Router, Request, Response } from 'express';
import LeaderboardEntry from '../models/LeaderboardEntry';
import User from '../models/User';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const entries = await LeaderboardEntry.find().sort({ points: -1 }).limit(20).populate('user', 'name').lean();
  const leaderboard = entries.map((e) => ({ user: (e.user as any).name, points: e.points }));
  res.json({ leaderboard });
});

export default router;

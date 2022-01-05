import { Request, Response, Router } from 'express';
import { Game, LowIntelligenceAIBar } from '@derzeiss/pong';

export const pongRouter = Router();

pongRouter.get('/', (req: Request, res: Response) => {
  const g = new Game(LowIntelligenceAIBar, LowIntelligenceAIBar);
  const results = g.simulate(1000);
  res.json(results);
});

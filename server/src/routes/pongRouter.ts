import { NextFunction, Request, Response, Router } from 'express';
import path from 'path';
import { runScript } from '../utility/runScript';

export const pongRouter = Router();

pongRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const pathUpdatePackage = path.join(__dirname, '../scripts/update-pong-package');
  const pathRunSimulations = path.join(__dirname, '../scripts/run-pong-simulations');
  try {
    console.log(__dirname);
    await runScript(pathUpdatePackage);
    await runScript(pathRunSimulations);
    res.send('done');
  } catch (err) {
    return next(err);
  }
});

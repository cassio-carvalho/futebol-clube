import { Router } from 'express';
import MatchController from '../database/controllers/matchController';
import { validateMatch, validateToken } from '../middlewares/validation.middleware';

const matchRouter = Router();

matchRouter.get('/matches', MatchController.getAllMatches);

matchRouter.patch('/matches/:id/finish', validateToken, MatchController.finishMatch);

matchRouter.post('/matches', validateMatch, MatchController.createMatch);

export default matchRouter;

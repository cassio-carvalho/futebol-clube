import { Router } from 'express';
import MatchController from '../database/controllers/matchController';

const matchRouter = Router();

matchRouter.get('/matches', MatchController.getAllMatches);

export default matchRouter;

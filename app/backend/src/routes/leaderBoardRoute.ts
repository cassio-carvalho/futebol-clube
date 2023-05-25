import { Router } from 'express';
import LeaderboardController from '../database/controllers/leaderBoardController';

const leaderboardRouter = Router();

leaderboardRouter.get('/leaderboard/home', LeaderboardController.createLeaderboard);

export default leaderboardRouter;

import { Router } from 'express';
import LeaderboardController from '../database/controllers/leaderBoardController';

const leaderboardRouter = Router();

const controller = new LeaderboardController();

leaderboardRouter.get('/leaderboard/home', controller.getHomeTeamsBoard);

export default leaderboardRouter;

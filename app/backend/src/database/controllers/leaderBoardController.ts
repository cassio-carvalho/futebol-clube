import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderBoardService';

class LeaderboardController {
  public static async createLeaderboard(_req: Request, res: Response): Promise<Response | void> {
    const leaderboard = await LeaderboardService.createLeaderboard();

    return res.status(200).json(leaderboard);
  }
}

export default LeaderboardController;

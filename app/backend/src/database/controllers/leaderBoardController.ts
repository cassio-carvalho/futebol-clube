import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderBoardService';

class LeaderboardController {
  private _service: LeaderboardService;

  constructor() {
    this._service = new LeaderboardService();
  }

  getHomeTeamsBoard = async (req: Request, res: Response) => {
    const matches = await this._service.getHomeTeamsBoard();
    return res.status(200).json(matches);
  };
}

export default LeaderboardController;

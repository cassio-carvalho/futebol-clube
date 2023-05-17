import { NextFunction, Request, Response } from 'express';
import MatchService from '../services/matchService';

class MatchController {
  public static getAllMatches = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const allMatches = await MatchService.getAllMatches();
      // console.log(`Controller - ${allMatches}`);

      return res.status(200).json(allMatches);
    } catch (error) {
      next(error);
    }
  };
}

export default MatchController;

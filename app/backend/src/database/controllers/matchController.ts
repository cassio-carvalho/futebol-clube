import { NextFunction, Request, Response } from 'express';
import MatchService from '../services/matchService';

class MatchController {
  public static getAllMatches = async (req: Request, res: Response, next: NextFunction) => {
    const { inProgress } = req.query;
    try {
      const allMatches = await MatchService.getAllMatches(inProgress as string);
      // console.log(`Controller - ${allMatches}`);

      return res.status(200).json(allMatches);
    } catch (error) {
      next(error);
    }
  };

  // public static getMatchesByProgress = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const { inProgress } = req.query;
  //     console.log(inProgress);

  //     const matchesInProgress = await MatchService.getMatchesByProgress(inProgress as string);
  //     console.log(`Controller - ${matchesInProgress}`);

  //     return res.status(200).json(matchesInProgress);
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}

export default MatchController;

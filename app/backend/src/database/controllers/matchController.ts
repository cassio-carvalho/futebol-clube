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

  public static finishMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await MatchService.finishMatch(Number(id));
      return res.status(200).json({ message: 'Finished' });
    } catch (e) {
      next(e);
    }
  };

  public static createMatch = async (req: Request, res: Response, next: NextFunction) => {
    const matchCreated = req.body;
    try {
      if (matchCreated.homeTeamId === matchCreated.awayTeamId) {
        // console.log(matchCreated);

        return res.status(401)
          .json({ message: 'It is not possible to create a match with two equal teams' });
      }

      const match = await MatchService.createMatch(matchCreated);

      if (match === 'invalid') {
        return res.status(404).json({ message: 'There is no team with such id!' });
      }

      return res.status(201).json(match);
    } catch (e) {
      next(e);
    }
  };

  public static updateMatch = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const { homeTeamGoals, awayTeamGoals } = req.body;

      const result = await MatchService.update(Number(id), homeTeamGoals, awayTeamGoals);

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };
}

export default MatchController;

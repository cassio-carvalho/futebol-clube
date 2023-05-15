import { NextFunction, Request, Response } from 'express';
import TeamsService from '../services/teamsService';

class TeamsController {
  public static getAllTeams = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allTeams = await TeamsService.getAllTeams();
      // console.log(`Controller - ${allTeams}`);

      return res.status(200).json(allTeams);
    } catch (error) {
      next(error);
    }
  };

  public static getTeamById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const team = await TeamsService.getTeamById(id);
      // console.log(`Controller - ${allTeams}`);

      return res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  };
}

export default TeamsController;

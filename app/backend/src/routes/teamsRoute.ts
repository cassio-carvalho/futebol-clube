import { Router } from 'express';
import TeamsController from '../database/controllers/teamsController';

const teamRouter = Router();

teamRouter.get('/teams', TeamsController.getAllTeams);

export default teamRouter;

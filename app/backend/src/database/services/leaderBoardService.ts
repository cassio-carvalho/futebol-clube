import ITeamRank from '../../interfaces/leaderboardInterface';
import CreateLeaderboard from '../../middlewares/CreateLeaderboard.middleware';
import MatchModel from '../models/MatchModel';
import TeamsModel from '../models/TeamsModel';

class LeaderboardService {
  public static async createLeaderboard(): Promise<ITeamRank[]> {
    const matches = await MatchModel.findAll({ where: { inProgress: false } });

    const teams = await TeamsModel.findAll();

    return CreateLeaderboard.generateLeaderboard(matches, teams);
  }
}

export default LeaderboardService;

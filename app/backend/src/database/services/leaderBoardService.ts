import ITeamRank from '../../interfaces/leaderboardInterface';
import LeaderboardBuilder from '../../middlewares/LeaderboardBuilder.middleware';
import MatchModel from '../models/MatchModel';
import TeamsModel from '../models/TeamsModel';

class LeaderboardService {
  public static async createLeaderboard(): Promise<ITeamRank[]> {
    const matches = await MatchModel.findAll({ where: { inProgress: false } });

    const teams = await TeamsModel.findAll();

    return LeaderboardBuilder.buildLeaderboard(matches, teams);
  }
}

export default LeaderboardService;

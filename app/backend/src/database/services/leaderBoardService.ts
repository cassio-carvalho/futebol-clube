import ITeamRank, { ITeamBoard } from '../../interfaces/leaderboardInterface';
import { IMatchBoard } from '../../interfaces/matchInterface';
import { teamInfoFromMatches } from '../../middlewares/leaderBoard.middleware';
import MatchModel from '../models/MatchModel';
import TeamsModel from '../models/TeamsModel';

export default class LeaderboardService {
  private _rank: ITeamRank[] = [];

  constructor(private _model = new MatchModel()) {}

  private static sortRankByPoints(teamsInfo: ITeamRank[]) {
    const sortedInfo = teamsInfo.sort((a, b) =>
      b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || a.goalsOwn - b.goalsOwn);

    return sortedInfo;
  }

  getHomeTeamsBoard = async () => {
    const matches = await MatchModel.findAll({ where: { inProgress: false } }) as IMatchBoard[];
    const teams = await LeaderboardService.getAllTeams() as ITeamBoard[];

    const teamsInfo = teams.map((team) => LeaderboardService.fillRankByTeam(matches, team));
    this._rank = LeaderboardService.sortRankByPoints(teamsInfo);
    return this._rank;
  };

  private static async getAllTeams() {
    const teams = await TeamsModel.findAll();
    return teams;
  }

  private static fillRankByTeam(matches: IMatchBoard[], team: ITeamBoard): ITeamRank {
    const teamInfo = teamInfoFromMatches(matches, team);
    return teamInfo;
  }
}

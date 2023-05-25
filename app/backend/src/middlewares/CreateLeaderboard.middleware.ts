import ITeamRank, { ITeamBoard } from '../interfaces/leaderboardInterface';
import { IMatchBoard } from '../interfaces/matchInterface';
import Calculate from './CalculateLeaderboard.middleware';

export default class CreateLeaderboard {
  public static generateLeaderboard(allMatches: IMatchBoard[], allTeams: ITeamBoard[]) {
    const leaderboard = allTeams.map((team) => this.generateRows(allMatches, team));
    return this.sortRows(leaderboard);
  }

  public static generateRows(allMatches: IMatchBoard[], { id, teamName }: ITeamBoard) {
    const teamMatches = allMatches.filter((m) => m.homeTeamId === id);
    return Calculate.teamStatus(teamName, teamMatches);
  }

  public static sortRows(leaderboard: ITeamRank[]) {
    return leaderboard.sort((home, away) => (
      away.totalPoints - home.totalPoints
      || away.totalVictories - home.totalVictories
      || away.goalsBalance - home.goalsBalance
      || away.goalsFavor - home.goalsFavor
      || away.goalsOwn - home.goalsOwn
    ));
  }
}

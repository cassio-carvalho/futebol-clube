import ITeamRank, { ITeamBoard } from '../interfaces/leaderboardInterface';
import { IMatchBoard } from '../interfaces/matchInterface';
import LeaderboardCalculator from './StatsCalculator.middleware';

class LeaderboardBuilder {
  public static buildLeaderboard(matchData: IMatchBoard[], teamData: ITeamBoard[]) {
    const leaderboard = teamData.map((team) => this.createRow(matchData, team));
    return this.sortLeaderboard(leaderboard);
  }

  public static createRow(matches: IMatchBoard[], teamData: ITeamBoard) {
    const relevantMatches = matches.filter((match) => match.homeTeamId === teamData.id);
    return LeaderboardCalculator.getTeamStats(teamData.teamName, relevantMatches);
  }

  public static sortLeaderboard(leaderboard: ITeamRank[]) {
    return leaderboard.sort((teamA, teamB) => (
      teamB.totalPoints - teamA.totalPoints
      || teamB.totalVictories - teamA.totalVictories
      || teamB.goalsBalance - teamA.goalsBalance
      || teamB.goalsFavor - teamA.goalsFavor
      || teamB.goalsOwn - teamA.goalsOwn
    ));
  }
}

export default LeaderboardBuilder;

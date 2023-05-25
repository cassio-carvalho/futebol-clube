import ITeamRank from '../interfaces/leaderboardInterface';
import { IMatchBoard } from '../interfaces/matchInterface';

export default class Calculate {
  public static teamStatus(teamName: string, matches: IMatchBoard[]): ITeamRank {
    const { victories, draws, losses } = this.calculateMatches(matches);
    const { goalsFavor, goalsOwn, goalsBalance } = this.calculateGoals(matches);

    const totalPoints = this.calculatePoints(victories.length, draws.length);
    const efficiency = this.calculateEfficiency(totalPoints, matches.length);

    return {
      name: teamName,
      totalPoints,
      totalGames: matches.length,
      totalVictories: victories.length,
      totalDraws: draws.length,
      totalLosses: losses.length,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency,
    };
  }

  public static calculatePoints(victories: number, draws: number) {
    return (victories * 3) + draws;
  }

  public static calculateMatches(matches: IMatchBoard[]) {
    const wins = matches.filter((match) => match.homeTeamGoals > match.awayTeamGoals);
    const draws = matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
    const losses = matches.filter((match) => match.homeTeamGoals < match.awayTeamGoals);

    return { victories: wins, draws, losses };
  }

  public static calculateGoals(matches: IMatchBoard[]) {
    const goalsFavor = matches.reduce((acc, cur) => acc + cur.homeTeamGoals, 0);
    const goalsOwn = matches.reduce((acc, cur) => acc + cur.awayTeamGoals, 0);
    const goalsBalance = goalsFavor - goalsOwn;

    return { goalsFavor, goalsOwn, goalsBalance };
  }

  public static calculateEfficiency(totalPoints: number, matches: number) {
    return Number(((totalPoints / (matches * 3)) * 100).toFixed(2));
  }
}

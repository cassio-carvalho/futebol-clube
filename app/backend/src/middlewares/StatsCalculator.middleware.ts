import ITeamRank from '../interfaces/leaderboardInterface';
import { IMatchBoard } from '../interfaces/matchInterface';

class StatsCalculator {
  public static getTeamStats(team: string, matchData: IMatchBoard[]): ITeamRank {
    const { wins, ties, defeats } = this.computeMatchStats(matchData);
    const { goalsScored, goalsConceded, goalDifference } = this.computeGoalStats(matchData);

    const totalPoints = this.computePoints(wins.length, ties.length);
    const teamEfficiency = this.computeEfficiency(totalPoints, matchData.length);

    return {
      name: team,
      totalPoints,
      totalGames: matchData.length,
      totalVictories: wins.length,
      totalDraws: ties.length,
      totalLosses: defeats.length,
      goalsFavor: goalsScored,
      goalsOwn: goalsConceded,
      goalsBalance: goalDifference,
      efficiency: teamEfficiency,
    };
  }

  public static computePoints(wins: number, ties: number) {
    return (wins * 3) + ties;
  }

  public static computeMatchStats(matchData: IMatchBoard[]) {
    const wins: IMatchBoard[] = [];
    const ties: IMatchBoard[] = [];
    const defeats: IMatchBoard[] = [];

    matchData.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        wins.push(match);
      } else if (match.homeTeamGoals === match.awayTeamGoals) {
        ties.push(match);
      } else {
        defeats.push(match);
      }
    });

    return { wins, ties, defeats };
  }

  public static computeGoalStats(matchData: IMatchBoard[]) {
    let goalsScored = 0;
    let goalsConceded = 0;

    matchData.forEach((match) => {
      goalsScored += match.homeTeamGoals;
      goalsConceded += match.awayTeamGoals;
    });

    const goalDifference = goalsScored - goalsConceded;

    return { goalsScored, goalsConceded, goalDifference };
  }

  public static computeEfficiency(totalPoints: number, totalMatches: number) {
    return Number(((totalPoints / (totalMatches * 3)) * 100).toFixed(2));
  }
}

export default StatsCalculator;

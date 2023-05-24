import ITeamRank, { ITeamBoard } from '../interfaces/leaderboardInterface';
import { IMatchBoard } from '../interfaces/matchInterface';

const matchPoints = (teamAGoals: number, teamBGoals: number) => {
  if (teamAGoals > teamBGoals) return 3;
  if (teamAGoals === teamBGoals) return 1;
  return 0;
};

const matchResults = (results: number[], points: number) => {
  const result = results.reduce((acc, cur) => {
    if (cur === points) return acc + 1;
    return acc;
  }, 0);
  return result;
};

const createBoardInfo = (receivedName: string): ITeamRank => ({
  name: receivedName,
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
});

const calculateEfficiency = (points: number, matches: number) => {
  const efficiency = (points / (matches * 3)) * 100;
  return parseFloat(efficiency.toFixed(2));
};

const teamInfoFromMatches = (matches: IMatchBoard[], team: ITeamBoard) => {
  const teamBoard = createBoardInfo(team.teamName);

  const results: number[] = [];
  matches.forEach((match) => {
    if (match.homeTeamId === team.id) {
      const points = matchResults([match.homeTeamGoals], match.awayTeamGoals);
      results.push(points);
      teamBoard.totalPoints += points;
      teamBoard.totalGames += 1;

      teamBoard.goalsFavor += match.homeTeamGoals;
      teamBoard.goalsOwn += match.awayTeamGoals;
    }
  });
  teamBoard.totalVictories = matchResults(results, 3);
  teamBoard.goalsBalance = teamBoard.goalsFavor - teamBoard.goalsOwn;
  teamBoard.totalDraws = matchResults(results, 1);
  teamBoard.totalLosses = matchResults(results, 0);
  teamBoard.efficiency = calculateEfficiency(teamBoard.totalPoints, results.length);

  return teamBoard;
};

export { matchPoints, teamInfoFromMatches };

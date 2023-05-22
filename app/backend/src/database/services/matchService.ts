import IMatch from '../../interfaces/matchInterface';
import MatchModel from '../models/MatchModel';
import TeamsModel from '../models/TeamsModel';

class MatchService {
  static getAllMatches = async (inProgress: string): Promise<IMatch[]> => {
    const matches = await MatchModel.findAll({
      include: [
        { model: TeamsModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamsModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    if (inProgress === 'true') {
      return matches.filter((match) => match.inProgress === true) as unknown as IMatch[];
    }

    if (inProgress === 'false') {
      return matches.filter((match) => match.inProgress === false) as unknown as IMatch[];
    }
    // console.log(matches);
    return matches as unknown as IMatch[];
  };

  public static finishMatch = async (id: number) => {
    const match = await MatchModel.update({ inProgress: false }, { where: { id } });

    return match;
  };

  public static createMatch = async (payload: IMatch): Promise<IMatch | string> => {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = payload;

    const findHome = await TeamsModel.findByPk(homeTeamId);
    const findAway = await TeamsModel.findByPk(awayTeamId);

    if (!findHome || !findAway) return 'invalid';

    const matchCreated = await MatchModel.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });

    return matchCreated as unknown as IMatch;
  };
}

export default MatchService;

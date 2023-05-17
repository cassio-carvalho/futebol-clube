import IMatch from '../../interfaces/matchInterface';
import MatchModel from '../models/MatchModel';
import TeamsModel from '../models/TeamsModel';

// class MatchService {
//   public static getAllMatches = async () => {
//     const matches = await MatchModel.findAll();
//     console.log(`Service - ${matches}`);

//     return matches;
//   };
// }

// export default MatchService;

class MatchService {
  static getAllMatches = async (): Promise<IMatch[]> => {
    const matches = await MatchModel.findAll({
      include: [
        { model: TeamsModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamsModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    // console.log(matches);
    return matches as unknown as IMatch[];
  };
}

export default MatchService;

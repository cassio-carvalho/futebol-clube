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

  // public static getMatchesByProgress = async (inProgress: string) => {
  //   // const matchesInProgress = MatchModel.findByPk(inProgress);
  //   const matchesInProgress = await MatchModel.findAll({
  //     include: [
  //       { model: TeamsModel, as: 'homeTeam', attributes: ['teamName'] },
  //       { model: TeamsModel, as: 'awayTeam', attributes: ['teamName'] },
  //     ],
  //   });

  //   if (inProgress === 'true') {
  //     return matchesInProgress.filter((match) => match.inProgress === true);
  //   }

  //   if (inProgress === 'false') {
  //     return matchesInProgress.filter((match) => match.inProgress === false);
  //   }
  //   console.log(`Service - ${matchesInProgress}`);

  //   // return matchesInProgress;
  // };
}

export default MatchService;

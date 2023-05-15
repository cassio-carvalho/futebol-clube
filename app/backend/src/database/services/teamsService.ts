import TeamsModel from '../models/TeamsModel';

class TeamsService {
  public static getAllTeams = async () => {
    const teams = TeamsModel.findAll();
    // console.log(`Service - ${teams}`);

    return teams;
  };
}

export default TeamsService;

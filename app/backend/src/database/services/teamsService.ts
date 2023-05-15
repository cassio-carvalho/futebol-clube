import TeamsModel from '../models/TeamsModel';

class TeamsService {
  public static getAllTeams = async () => {
    const teams = TeamsModel.findAll();
    // console.log(`Service - ${teams}`);

    return teams;
  };

  public static getTeamById = async (id: string) => {
    const team = TeamsModel.findByPk(id);
    console.log(`Service - ${team}`);

    return team;
  };
}

export default TeamsService;

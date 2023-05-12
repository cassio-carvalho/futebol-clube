import { DataTypes, Model } from 'sequelize';
import db from '.';
import MatchModel from './MatchModel';

class TeamsModel extends Model {
  declare id: number;
  declare teamName: string;
}

TeamsModel.init({
  // ... Campos
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

// * Associations 1:N devem ficar em uma das instâncias de modelo

MatchModel.belongsTo(TeamsModel, { foreignKey: 'homeTeamId', as: 'homeTeam' });
MatchModel.belongsTo(TeamsModel, { foreignKey: 'awayTeamId', as: 'awayTeam' });

TeamsModel.hasMany(MatchModel, { foreignKey: 'homeTeamId', as: 'homeTeam' });
TeamsModel.hasMany(MatchModel, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default TeamsModel;

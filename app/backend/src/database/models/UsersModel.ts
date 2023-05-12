import { DataTypes, Model } from 'sequelize';
import db from '.';

class UsersModel extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

UsersModel.init({
  // ... Campos
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default UsersModel;

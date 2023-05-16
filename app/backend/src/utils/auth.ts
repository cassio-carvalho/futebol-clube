import * as jwt from 'jsonwebtoken';

import IUser from '../interfaces/userInterface';

const SECRET = process.env.JWT_SECRET || 'jwt_secret';

const generateToken = async (credentials: IUser) => {
  const token = jwt.sign(credentials, SECRET, {
    expiresIn: '3d',
  });
  return token;
};

export default generateToken;

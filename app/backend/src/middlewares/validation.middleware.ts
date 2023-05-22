import * as bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import UsersModel from '../database/models/UsersModel';

const SECRET = process.env.JWT_SECRET || 'jwt_secret';

const invalid = 'Invalid email or password';

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const result = jwt.verify(token, SECRET) as jwt.JwtPayload;
    req.body.user = result.data;
    req.body = { role: result.role };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = await req.body;
  const regex = /^\w+[\\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i;

  const testEmail = regex.test(email);
  const testPassword = (password.length >= 6);
  // console.log(testPassword);

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (!testEmail || !testPassword) return res.status(401).json({ message: invalid });

  const user = await UsersModel.findOne({ where: { email } });

  if (!user) return res.status(401).json({ message: invalid });

  if (!await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ message: invalid });
  }
  next();
};

const validateMatch = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const result = jwt.verify(token as string, SECRET) as jwt.JwtPayload;
    req.body.user = result;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export {
  validateUser,
  validateToken,
  validateMatch,
};

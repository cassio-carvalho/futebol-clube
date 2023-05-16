import * as bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import UsersModel from '../database/models/UsersModel';

const invalid = 'Invalid email or password';

const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = await req.body;
  const regex = /^\w+[\\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i;

  const testEmail = regex.test(email);
  const testPassword = (password.length >= 6);
  console.log(testPassword);

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

export default validateUser;

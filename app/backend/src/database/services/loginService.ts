import ILogin from '../../interfaces/loginInterface';
import generateToken from '../../utils/auth';
import UsersModel from '../models/UsersModel';

const loginService = async (credentials: ILogin) => {
  const user = await UsersModel.findOne({ where: { email: credentials.email } });

  // console.log(user);

  if (!user) throw new Error('Invalid email or password');

  const { id, username, role, email } = user;

  const token = await generateToken({ id, username, role, email });

  return { token };
};

export default loginService;

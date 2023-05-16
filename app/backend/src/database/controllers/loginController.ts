import { Request, Response } from 'express';
import loginService from '../services/loginService';

class LoginController {
  public static login = async (req: Request, res: Response) => {
    const token = await loginService(req.body);

    return res.status(200).json(token);
  };

  public static role = async (req: Request, res: Response) => {
    const { role } = req.body;

    return res.status(200).json({ role });
  };
}

export default LoginController;

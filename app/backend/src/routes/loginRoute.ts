import { Router } from 'express';
import LoginController from '../database/controllers/loginController';
import validateUser from '../middlewares/validation.middleware';

const loginRouter = Router();

loginRouter.post('/login', validateUser, LoginController.login);

export default loginRouter;

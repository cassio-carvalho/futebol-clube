import { Router } from 'express';
import LoginController from '../database/controllers/loginController';
import { validateToken, validateUser } from '../middlewares/validation.middleware';

const loginRouter = Router();

loginRouter.post('/login', validateUser, LoginController.login);

loginRouter.get('/login/role', validateToken, LoginController.role);

export default loginRouter;

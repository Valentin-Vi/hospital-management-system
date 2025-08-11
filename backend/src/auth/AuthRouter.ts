import { Router } from 'express';
import authController from './AuthController';

const authRouter = Router();
const controller = new authController();

authRouter.post('/signup', controller.signup);
authRouter.post('/login', controller.login);
authRouter.post('/logout', controller.logout);
authRouter.post('/refresh', controller.refresh);

export default authRouter;

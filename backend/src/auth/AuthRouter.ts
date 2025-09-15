import { Router } from 'express';
import authController from './AuthController';

const authRouter = Router();
const controller = new authController();

authRouter.post('/signup', controller.signup.bind(controller));
authRouter.post('/login', controller.login.bind(controller));
authRouter.post('/logout', controller.logout.bind(controller));
authRouter.post('/refresh', controller.refresh.bind(controller));

export default authRouter;

import { Router } from 'express';
import AuthenticationController from './AuthController';
const authenticationRouter = Router();
const controller = new AuthenticationController();
authenticationRouter.post('/signup', controller.signup);
authenticationRouter.post('/login', controller.login);
authenticationRouter.post('/logout', controller.logout);
authenticationRouter.post('/refresh', controller.refresh);
export default authenticationRouter;

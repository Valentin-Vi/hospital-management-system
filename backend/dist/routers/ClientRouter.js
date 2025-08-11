import { Router } from "express";
import ClientController from "../services/user-management/client-management/ClientController";
const clntRouter = Router();
const clnt = new ClientController();
clntRouter.post('/find', clnt.findByClientId);
clntRouter.post('/remove', clnt.remove);
clntRouter.get('/all', clnt.all);
export default clntRouter;

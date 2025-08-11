import { Router } from "express";
import { AdminController } from "../controller";
const adminRouter = Router();
const controller = new AdminController();
adminRouter.get('/create/admin', controller.createAdminUser);
adminRouter.get('/create/doctor', controller.createDoctorUser);
adminRouter.get('/create/desk', controller.createDeskUser);
export default adminRouter;

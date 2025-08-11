import { Router } from "express";
import { AdminController } from "@controllers";

const router = Router();
const controller = new AdminController();

router.get('/users/get-paginated', controller.getPaginatedUsers);

export default router;

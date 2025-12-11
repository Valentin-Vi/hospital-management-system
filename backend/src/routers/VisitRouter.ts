import { Router } from "express";
import { VisitController } from "@/controllers";

const router = Router();
const controller = new VisitController();

router.get("/available-slots", controller.getAvailableSlots);
router.get("/doctors", controller.getDoctors);
router.get("/my-visits", controller.getMyVisits);
router.post("/request", controller.createVisit);

export default router;


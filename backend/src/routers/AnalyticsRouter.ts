import { Router } from "express";
import AnalyticsController from "../controllers/AnalyticsController";

const router = Router();
const controller = new AnalyticsController();

router.get("/dashboard", (req, res) => controller.getDashboardMetrics(req, res));

export default router;

import { Request, Response } from "express";
import { AnalyticsService }from "@/services";

export default class AnalyticsController {
  private service: AnalyticsService;

  constructor() {
    this.service = new AnalyticsService();
  }

  async getDashboardMetrics(req: Request, res: Response) {
    try {
      const metrics = await this.service.getDashboardMetrics();
      res.json(metrics);
    } catch (error) {
      console.error("Error fetching dashboard metrics:", error);
      res.status(500).json({ error: "Failed to fetch dashboard metrics" });
    }
  }
}

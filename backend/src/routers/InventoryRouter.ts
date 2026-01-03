import { Router } from "express";
import { InventoryController } from '@/controllers'

const router = Router();
const controller = new InventoryController();

router.get('/get-paginated', controller.getPaginatedMedications);

export default router;

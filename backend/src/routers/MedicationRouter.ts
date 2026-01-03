import { Router } from "express";
import { MedicationController } from "@controllers";

const router = Router()
const controller = new MedicationController();

router.get('/get-paginated', controller.getPaginatedMedications)
router.get('/get-filtered-paginated', controller.getFilteredPaginatedMedications)
router.delete('/delete', controller.deleteRow)
router.delete('/delete-many', controller.deleteMany)
router.get('/get-all', controller.getEntireMedicationsInventory)
router.post('/insert', controller.insertRow)

export default router;

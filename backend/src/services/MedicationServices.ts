import { MedicationDal } from "@dals";
import { Medication } from "@models";

class MedicationService {
  constructor(
    private readonly medicationDal: MedicationDal = new MedicationDal()
  ) {}

  public async getPaginatedMedications(page: number, limit: number) {
    return await this.medicationDal.getPaginatedMedications(page, limit);
  }

  public async getFilteredPaginatedMedications(page: number, limit: number, filter: { column: string, value: string }) {
    return await this.medicationDal.getFilteredPaginatedMedications(page, limit, filter);
  }
  public async deleteRow(rowId: number): Promise<boolean> {
    return await this.medicationDal.deleteRow(rowId);
  }

  public async deleteMany(rowIds: number[]): Promise<boolean> {
    return await this.medicationDal.deleteMany(rowIds);
  }

  public async getEntireMedicationsInventory() {
    return await this.medicationDal.getEntireMedicationsInventory();
  }

  public async insertRow(medication: Medication) {
    return await this.medicationDal.insertMedication(medication);
  }

}

export default MedicationService;

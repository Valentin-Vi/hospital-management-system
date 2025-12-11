import { PrismaClient } from "@prisma/client";
import { MedicationRepository, MedicationQueryRepository } from "@/repositories";
import { Medication } from "@/models";

class MedicationService {
  private medicationRepo: MedicationRepository;
  private medicationQueryRepo: MedicationQueryRepository;

  constructor() {
    const prisma = new PrismaClient();
    this.medicationRepo = new MedicationRepository(prisma);
    this.medicationQueryRepo = new MedicationQueryRepository(prisma);
  }

  public async getPaginatedMedications(page: number, limit: number) {
    return await this.medicationQueryRepo.findPaginated(page, limit);
  }

  public async getFilteredPaginatedMedications(page: number, limit: number, filter: { column: string, value: string }) {
    return await this.medicationQueryRepo.findFilteredPaginated(page, limit, filter);
  }

  public async deleteRow(rowId: number): Promise<boolean> {
    try {
      await this.medicationRepo.delete(rowId);
      return true;
    } catch (error) {
      return false;
    }
  }

  public async deleteMany(rowIds: number[]): Promise<boolean> {
    try {
      await this.medicationRepo.deleteMany(rowIds);
      return true;
    } catch (error) {
      return false;
    }
  }

  public async getEntireMedicationsInventory() {
    return await this.medicationQueryRepo.findAllWithBatches();
  }

  public async insertRow(medication: Medication) {
    return await this.medicationRepo.create(medication);
  }
}

export default MedicationService;

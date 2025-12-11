import { PrismaClient } from "@prisma/client";
import { MedicationQueryRepository } from "@/repositories";

export default class InventoryService {
  private medicationQueryRepo: MedicationQueryRepository;

  constructor() {
    const prisma = new PrismaClient();
    this.medicationQueryRepo = new MedicationQueryRepository(prisma);
  }

  async getPaginatedMedications(page: number, limit: number) {
    return await this.medicationQueryRepo.findPaginated(page, limit);
  }
}


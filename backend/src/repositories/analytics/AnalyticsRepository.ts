import { PrismaClient } from "@prisma/client";
import { MedicationQueryRepository, MedicationRepository } from "@/repositories";
import { BatchRepository } from "../batch/BatchRepository";
import { Medication } from "@/models/medication";
import { Batch } from "@/models/batch";

export class AnalyticsRepository {
  constructor(
    // private readonly prisma: PrismaClient,
    private readonly medicationRepo: MedicationRepository,
    private readonly medicationQueryRepo: MedicationQueryRepository,
    private readonly batchRepo: BatchRepository
  ) {}

  async getLowStockMedications(): Promise<Array<{
    medication: Medication;
    totalStock: number;
  }>> {
    return await this.medicationQueryRepo.findLowStock()
  }

  async getExpiredBatches(): Promise<Batch[]> {
    return await this.batchRepo.findExpired();
  }

  async getExpiringSoonBatches(days: number = 30): Promise<Batch[]> {
    return await this.batchRepo.findExpiringSoon(days);
  }

  async getTotalStock(): Promise<number> {
    const batches = await this.batchRepo.findAll();
    return batches.reduce((sum, batch) => sum + batch.quantity, 0);
  }

  async getStockDistributionByCategory(): Promise<Array<{
    category: string;
    count: number;
  }>> {
    const medications = await this.medicationRepo.findAll();
    const batches = await this.batchRepo.findAll();

    const distribution: Record<string, number> = {};

    for (const med of medications) {
      const category = med.category || 'Uncategorized';
      const totalStock = batches
        .filter(b => b.medicationId === med.medicationId)
        .reduce((sum, b) => sum + b.quantity, 0);
      
      distribution[category] = (distribution[category] || 0) + totalStock;
    }

    return Object.entries(distribution).map(([category, count]) => ({
      category,
      count: Math.round(count * 10) / 10
    }));
  }

  async getMedicationsAtRiskAfterTomorrowExpiration(): Promise<Array<{
    medication: Medication;
    currentTotalStock: number;
    expiringTomorrowQuantity: number;
    projectedStockAfterExpiration: number;
    minimumQuantity: number;
  }>> {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

    const medications = await this.medicationRepo.findAll();
    const batches = await this.batchRepo.findAll();

    return medications
      .map(med => {
        const totalStock = batches
          .filter(b => b.medicationId === med.medicationId)
          .reduce((sum, b) => sum + b.quantity, 0);
        
        const expiringTomorrow = batches
          .filter(b => {
            if (b.medicationId !== med.medicationId) return false;
            const expDate = new Date(b.expirationDate);
            return expDate >= tomorrow && expDate < dayAfterTomorrow;
          })
          .reduce((sum, b) => sum + b.quantity, 0);
        
        const projectedStock = totalStock - expiringTomorrow;
        
        return {
          medication: med,
          currentTotalStock: totalStock,
          expiringTomorrowQuantity: expiringTomorrow,
          projectedStockAfterExpiration: projectedStock,
          minimumQuantity: med.minimum_quantity
        };
      })
      .filter(result => result.projectedStockAfterExpiration < result.minimumQuantity);
  }
}


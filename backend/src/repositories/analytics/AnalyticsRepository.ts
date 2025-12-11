import { PrismaClient } from "@prisma/client";
import { MedicationRepository } from "../medication/MedicationRepository";
import { BatchRepository } from "../batch/BatchRepository";

/**
 * Repository for cross-cutting analytics queries
 * Orchestrates multiple repositories to provide business insights
 */
export class AnalyticsRepository {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly medicationRepo: MedicationRepository,
    private readonly batchRepo: BatchRepository
  ) {}

  /**
   * Get medications with low stock (total batches <= minimum_quantity)
   */
  async getLowStockMedications(): Promise<Array<{
    medication: any;
    totalStock: number;
    minimumQuantity: number;
  }>> {
    const medications = await this.medicationRepo.findAll();
    const batches = await this.batchRepo.findAll();

    const results = medications.map(med => {
      const medicationBatches = batches.filter(b => b.medicationId === med.medicationId);
      const totalStock = medicationBatches.reduce((sum, b) => sum + b.quantity, 0);
      
      return {
        medication: med,
        totalStock,
        minimumQuantity: med.minimum_quantity
      };
    }).filter(result => result.totalStock <= result.minimumQuantity);

    return results;
  }

  /**
   * Get medications that will have insufficient stock after batches expire tomorrow
   */
  async getMedicationsAtRiskAfterTomorrowExpiration(): Promise<Array<{
    medication: any;
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
    const expiringTomorrow = await this.batchRepo.findExpiringBetween(tomorrow, dayAfterTomorrow);

    const results = medications.map(med => {
      const medicationBatches = batches.filter(b => b.medicationId === med.medicationId);
      const totalStock = medicationBatches.reduce((sum, b) => sum + b.quantity, 0);
      
      const expiringBatches = expiringTomorrow.filter(b => b.medicationId === med.medicationId);
      const expiringQuantity = expiringBatches.reduce((sum, b) => sum + b.quantity, 0);
      
      const projectedStock = totalStock - expiringQuantity;
      
      return {
        medication: med,
        currentTotalStock: totalStock,
        expiringTomorrowQuantity: expiringQuantity,
        projectedStockAfterExpiration: projectedStock,
        minimumQuantity: med.minimum_quantity
      };
    }).filter(result => result.projectedStockAfterExpiration < result.minimumQuantity);

    return results;
  }

  /**
   * Get expired batches with medication info
   */
  async getExpiredBatches() {
    return await this.batchRepo.findExpired();
  }

  /**
   * Get batches expiring soon with medication info
   */
  async getExpiringSoonBatches(days: number = 30) {
    return await this.batchRepo.findExpiringSoon(days);
  }

  /**
   * Get total stock across all medications
   */
  async getTotalStock(): Promise<number> {
    const batches = await this.batchRepo.findAll();
    return batches.reduce((sum, batch) => sum + batch.quantity, 0);
  }

  /**
   * Get stock distribution by category
   */
  async getStockDistributionByCategory(): Promise<Array<{
    category: string;
    count: number;
  }>> {
    const medications = await this.medicationRepo.findAll();
    const batches = await this.batchRepo.findAll();

    const distribution: Record<string, number> = {};

    medications.forEach(med => {
      const category = med.category || 'Uncategorized';
      const medicationBatches = batches.filter(b => b.medicationId === med.medicationId);
      const totalStock = medicationBatches.reduce((sum, b) => sum + b.quantity, 0);
      distribution[category] = (distribution[category] || 0) + totalStock;
    });

    return Object.entries(distribution).map(([category, count]) => ({
      category,
      count: Math.round(count * 10) / 10
    }));
  }
}


import { PrismaClient } from "@prisma/client";
import { AnalyticsRepository, MedicationQueryRepository } from "@/repositories";
import { MedicationRepository } from "@/repositories";
import { BatchRepository } from "@/repositories";

export default class AnalyticsService {
  private analyticsRepo: AnalyticsRepository;
  private medicationRepo: MedicationRepository;
  private medicationQueryRepo: MedicationQueryRepository;
  private batchRepo: BatchRepository;

  constructor() {
    const prisma = new PrismaClient();
    this.medicationRepo = new MedicationRepository(prisma);
    this.medicationQueryRepo = new MedicationQueryRepository(prisma);
    this.batchRepo = new BatchRepository(prisma);
    this.analyticsRepo = new AnalyticsRepository(this.medicationRepo, this.medicationQueryRepo, this.batchRepo);
  }

  async getDashboardMetrics() {
    const [
      lowStockItems,
      expiredBatches,
      expiringSoonBatches,
      totalStock,
      stockDistribution
    ] = await Promise.all([
      this.analyticsRepo.getLowStockMedications(),
      this.analyticsRepo.getExpiredBatches(),
      this.analyticsRepo.getExpiringSoonBatches(30),
      this.analyticsRepo.getTotalStock(),
      this.analyticsRepo.getStockDistributionByCategory()
    ]);

    return {
      kpis: {
        lowStockCount: lowStockItems.length,
        expiredCount: expiredBatches.length,
        expiringSoonCount: expiringSoonBatches.length,
        totalStock: totalStock
      },
      charts: {
        stockDistribution
      },
      lists: {
        lowStockItems: lowStockItems.map((item: any) => ({
          medicationName: item.medication.name,
          quantity: item.totalStock,
          minQuantity: item.minimumQuantity
        })),
        expiredBatches: expiredBatches.map((batch: any) => ({
          medicationName: batch.medication?.name || 'Unknown',
          batchId: batch.batchId,
          expirationDate: batch.expirationDate,
          quantity: batch.quantity
        })),
        expiringSoonBatches: expiringSoonBatches.map((batch: any) => ({
          medicationName: batch.medication?.name || 'Unknown',
          batchId: batch.batchId,
          expirationDate: batch.expirationDate,
          quantity: batch.quantity
        }))
      }
    };
  }
}

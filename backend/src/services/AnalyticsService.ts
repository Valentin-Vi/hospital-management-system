import AnalyticsDal from "../dals/AnalyticsDal";

export default class AnalyticsService {
  private dal: AnalyticsDal;

  constructor() {
    this.dal = new AnalyticsDal();
  }

  async getDashboardMetrics() {
    const [
      lowStockItems,
      expiredBatches,
      expiringSoonBatches,
      totalStock,
      stockDistribution
    ] = await Promise.all([
      this.dal.getLowStockItems(),
      this.dal.getExpiredBatches(),
      this.dal.getExpiringSoonBatches(30),
      this.dal.getTotalStock(),
      this.dal.getStockDistributionByCategory()
    ]);

    // Calculate Stock Health Ratio (items with quantity > min_quantity / total items)
    // For this we need total items count.
    // Let's assume we can get it from stockDistribution or another query.
    // For now, let's just return the raw numbers.

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
        lowStockItems: lowStockItems.map(item => ({
          medicationName: item.medication.name,
          quantity: item.quantity,
          minQuantity: item.minimum_quantity
        })),
        expiredBatches: expiredBatches.map(batch => ({
          medicationName: batch.medication.name,
          batchId: batch.batchId,
          expirationDate: batch.expiration_date,
          quantity: batch.quantity
        })),
        expiringSoonBatches: expiringSoonBatches.map(batch => ({
          medicationName: batch.medication.name,
          batchId: batch.batchId,
          expirationDate: batch.expiration_date,
          quantity: batch.quantity
        }))
      }
    };
  }
}

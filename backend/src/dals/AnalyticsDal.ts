import { PrismaClient } from "@prisma/client";

export default class AnalyticsDal {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getLowStockItems() {
    // Items where total quantity (sum of batches) <= minimum_quantity
    // Since Inventory holds the minimum_quantity and total quantity (if we keep it updated),
    // we can use Inventory.
    // However, with batches, we should ideally sum batches.
    // For now, let's assume Inventory.quantity is kept in sync or we calculate it.
    // Let's rely on Inventory.quantity for speed, assuming it's the aggregate.
    return this.prisma.inventory.findMany({
      where: {
        quantity: {
          lte: this.prisma.inventory.fields.minimum_quantity
        }
      },
      include: {
        medication: true
      }
    });
  }

  async getExpiredBatches() {
    return this.prisma.batch.findMany({
      where: {
        expiration_date: {
          lt: new Date()
        },
        quantity: {
          gt: 0
        }
      },
      include: {
        medication: true
      }
    });
  }

  async getExpiringSoonBatches(days: number = 30) {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);

    return this.prisma.batch.findMany({
      where: {
        expiration_date: {
          gte: new Date(),
          lte: futureDate
        },
        quantity: {
          gt: 0
        }
      },
      include: {
        medication: true
      }
    });
  }

  async getTotalStock() {
    const aggregations = await this.prisma.inventory.aggregate({
      _sum: {
        quantity: true
      }
    });
    return aggregations._sum.quantity || 0;
  }

  async getStockDistributionByCategory() {
    const medications = await this.prisma.medication.findMany({
      include: {
        inventory: true
      }
    });

    const distribution: Record<string, number> = {};

    for (const med of medications) {
      const category = med.category || 'Uncategorized';
      const qty = med.inventory?.quantity || 0;
      distribution[category] = (distribution[category] || 0) + qty;
    }

    return Object.entries(distribution).map(([category, count]) => ({
      category,
      count
    }));
  }
}

import { PrismaClient } from "@prisma/client";
import { Batch } from "@/models";

/**
 * Repository for Batch entity CRUD operations
 */
export class BatchRepository {
  constructor(private readonly prisma: PrismaClient) {}

  /**
   * Create a new batch
   */
  async create(batch: Batch): Promise<Batch> {
    const prismaBatch = await this.prisma.batch.create({
      data: {
        medicationId: batch.medicationId,
        quantity: batch.quantity,
        expiration_date: batch.expirationDate,
      },
      include: {
        medication: true
      }
    });
    return this._toDomain(prismaBatch);
  }

  /**
   * Find batch by ID
   */
  async findById(id: number): Promise<Batch | null> {
    const result = await this.prisma.batch.findUnique({
      where: { batchId: id },
      include: { medication: true }
    });
    return result ? this._toDomain(result) : null;
  }

  /**
   * Find all batches for a medication
   */
  async findByMedicationId(medicationId: number): Promise<Batch[]> {
    const results = await this.prisma.batch.findMany({
      where: { medicationId },
      include: { medication: true },
      orderBy: { expiration_date: 'asc' }
    });
    return results.map(r => this._toDomain(r));
  }

  /**
   * Find all batches
   */
  async findAll(): Promise<Batch[]> {
    const results = await this.prisma.batch.findMany({
      include: { medication: true },
      orderBy: { expiration_date: 'asc' }
    });
    return results.map(r => this._toDomain(r));
  }

  /**
   * Find expired batches
   */
  async findExpired(): Promise<Batch[]> {
    const results = await this.prisma.batch.findMany({
      where: {
        expiration_date: { lt: new Date() },
        quantity: { gt: 0 }
      },
      include: { medication: true }
    });
    return results.map(r => this._toDomain(r));
  }

  /**
   * Find batches expiring soon
   */
  async findExpiringSoon(days: number = 30): Promise<Batch[]> {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);

    const results = await this.prisma.batch.findMany({
      where: {
        expiration_date: {
          gte: new Date(),
          lte: futureDate
        },
        quantity: { gt: 0 }
      },
      include: { medication: true }
    });
    return results.map(r => this._toDomain(r));
  }

  /**
   * Find batches expiring between dates
   */
  async findExpiringBetween(start: Date, end: Date): Promise<Batch[]> {
    const results = await this.prisma.batch.findMany({
      where: {
        expiration_date: {
          gte: start,
          lte: end
        },
        quantity: { gt: 0 }
      },
      include: { medication: true }
    });
    return results.map(r => this._toDomain(r));
  }

  /**
   * Update batch
   */
  async update(id: number, data: Partial<Batch>): Promise<Batch> {
    const prismaBatch = await this.prisma.batch.update({
      where: { batchId: id },
      data: {
        ...(data.medicationId !== undefined && { medicationId: data.medicationId }),
        ...(data.quantity !== undefined && { quantity: data.quantity }),
        ...(data.expirationDate && { expiration_date: data.expirationDate }),
      },
      include: { medication: true }
    });
    return this._toDomain(prismaBatch);
  }

  /**
   * Delete batch by ID
   */
  async delete(id: number): Promise<void> {
    await this.prisma.batch.delete({
      where: { batchId: id }
    });
  }

  /**
   * Convert Prisma model to domain entity
   */
  private _toDomain(prisma: any): Batch {
    // Import Medication dynamically to avoid circular dependency
    const { Medication } = require("@/models");
    const medication = prisma.medication ? new Medication(
      prisma.medication.medicationId,
      prisma.medication.name,
      prisma.medication.category,
      prisma.medication.brand_name,
      prisma.medication.generic_name,
      prisma.medication.strength,
      prisma.medication.form,
      prisma.medication.minimum_quantity ?? 0
    ) : undefined;

    return new Batch(
      prisma.batchId,
      prisma.medicationId,
      prisma.quantity,
      new Date(prisma.expiration_date),
      medication
    );
  }
}


import { PrismaClient } from "@prisma/client";
import { Batch } from "@/models/batch";
import { Medication } from "@/models/medication";

/**
 * Repository for Batch operations
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
    const batches = await this.prisma.batch.findMany({
      where: { medicationId },
      include: { medication: true },
      orderBy: { expiration_date: 'asc' }
    });
    return batches.map(batch => this._toDomain(batch));
  }

  /**
   * Find expired batches
   */
  async findExpired(): Promise<Batch[]> {
    const batches = await this.prisma.batch.findMany({
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
    return batches.map(batch => this._toDomain(batch));
  }

  /**
   * Find batches expiring soon
   */
  async findExpiringSoon(days: number = 30): Promise<Batch[]> {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);

    const batches = await this.prisma.batch.findMany({
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
    return batches.map(batch => this._toDomain(batch));
  }

  /**
   * Find all batches
   */
  async findAll(): Promise<Batch[]> {
    const batches = await this.prisma.batch.findMany({
      include: { medication: true }
    });
    return batches.map(batch => this._toDomain(batch));
  }

  /**
   * Update batch
   */
  async update(id: number, data: Partial<Batch>): Promise<Batch> {
    const prismaBatch = await this.prisma.batch.update({
      where: { batchId: id },
      data: {
        medicationId: data.medicationId,
        quantity: data.quantity,
        expiration_date: data.expirationDate,
      },
      include: { medication: true }
    });
    return this._toDomain(prismaBatch);
  }

  /**
   * Delete batch
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
    const medication = prisma.medication ? new Medication(
      prisma.medication.medicationId,
      prisma.medication.name,
      prisma.medication.category,
      prisma.medication.brand_name,
      prisma.medication.generic_name,
      prisma.medication.strength,
      prisma.medication.form,
      prisma.medication.minimum_quantity
    ) : undefined;

    return new Batch(
      prisma.batchId,
      prisma.medicationId,
      prisma.quantity,
      prisma.expiration_date,
      medication
    );
  }
}


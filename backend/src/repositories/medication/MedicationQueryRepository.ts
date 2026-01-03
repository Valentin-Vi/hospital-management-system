import { PrismaClient } from "@prisma/client";
import { Medication } from "@/models/medication";
import { Batch } from "@/models/batch";

/**
 * Repository for complex Medication read queries
 * Handles pagination, filtering, and complex joins
 */
export class MedicationQueryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  /**
   * Find medications with pagination
   */
  async findPaginated(page: number, limit: number): Promise<Medication[]> {
    const prismaMedications = await this.prisma.medication.findMany({
      skip: page * limit,
      take: limit,
      orderBy: { medicationId: 'desc' }
    });
    return prismaMedications.map(med => this._toDomain(med));
  }

  /**
   * Find medications with pagination and filtering
   */
  async findFilteredPaginated(
    page: number,
    limit: number,
    filter: { column: string, value: string }
  ): Promise<Medication[]> {
    const allowedColumns = [
      'medicationId',
      'name',
      'category',
      'brand_name',
      'generic_name',
      'strength',
      'form'
    ];

    if (!allowedColumns.includes(filter.column)) {
      throw new Error(`Unrecognized filter column: ${filter.column}`);
    }

    const whereClause: any = {};
    
    // Handle numeric columns
    if (filter.column === 'medicationId') {
      whereClause[filter.column] = parseInt(filter.value);
    } else {
      // Handle string columns with case-insensitive search
      whereClause[filter.column] = {
        contains: filter.value,
        mode: 'insensitive'
      };
    }

    const prismaMedications = await this.prisma.medication.findMany({
      where: whereClause,
      skip: page * limit,
      take: limit,
      orderBy: { medicationId: 'desc' }
    });

    return prismaMedications.map(med => this._toDomain(med));
  }

  /**
   * Find all medications with their batches
   */
  async findAllWithBatches(): Promise<Array<Medication & { batches: Batch[] }>> {
    const prismaMedications = await this.prisma.medication.findMany({
      include: {
        batches: {
          where: {
            quantity: { gt: 0 }
          }
        }
      }
    });

    return prismaMedications.map(med => ({
      ...this._toDomain(med),
      batches: med.batches.map(batch => new Batch(
        batch.batchId,
        batch.medicationId,
        batch.quantity,
        batch.expiration_date,
        this._toDomain(med)
      ))
    }));
  }

  /**
   * Find all medications
   */
  async findAll(): Promise<Medication[]> {
    const prismaMedications = await this.prisma.medication.findMany();
    return prismaMedications.map(med => this._toDomain(med));
  }

  /**
   * Convert Prisma model to domain entity
   */
  private _toDomain(prisma: any): Medication {
    return new Medication(
      prisma.medicationId,
      prisma.name,
      prisma.category,
      prisma.brand_name,
      prisma.generic_name,
      prisma.strength,
      prisma.form,
      prisma.minimum_quantity
    );
  }
}


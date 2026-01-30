import { PrismaClient } from "@prisma/client";
import { Medication } from "@/models/medication";
import { Batch } from "@/models/batch";
import { LowStockMedication } from "@/repositories/analytics/types";

export class MedicationQueryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findPaginated(page: number, limit: number): Promise<Medication[]> {
    const prismaMedications = await this.prisma.medication.findMany({
      skip: page * limit,
      take: limit,
      orderBy: { medicationId: 'desc' }
    });
    return prismaMedications.map(med => this._toDomain(med));
  }

  async findLowStock(): Promise<Array<LowStockMedication>> {
    const result = await this.prisma.$queryRaw<[Medication & { total_stock: number }]>`
      SELECT m.*, COALESCE(SUM(b.quantity), 0)::int as total_stock
      FROM "medications" m
      LEFT JOIN "batches" b ON b."medicationId" = m."medicationId"
      GROUP BY m."medicationId"
      HAVING COALESCE(SUM(b.quantity), 0) <= m.minimum_quantity
    `
    
    return result.map(r => ({
      medication: this._toDomain(r),
      totalStock: r.total_stock
    }))
  }

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
    
    if (filter.column === 'medicationId') {
      whereClause[filter.column] = parseInt(filter.value);
    } else {
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

  async findAll(): Promise<Medication[]> {
    const prismaMedications = await this.prisma.medication.findMany();
    return prismaMedications.map(med => this._toDomain(med));
  }

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


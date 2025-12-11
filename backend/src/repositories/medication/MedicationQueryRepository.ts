import { PrismaClient } from "@prisma/client";
import { Medication } from "@/models";

/**
 * Repository for complex Medication read queries
 * Handles pagination, filtering, and search operations
 */
export class MedicationQueryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  /**
   * Get paginated medications
   */
  async findPaginated(page: number, limit: number): Promise<Medication[]> {
    const prismaMedications = await this.prisma.medication.findMany({
      skip: page * limit,
      take: limit,
      orderBy: { medicationId: 'desc' }
    });
    return prismaMedications.map(m => this._toDomain(m));
  }

  /**
   * Get filtered and paginated medications using fuzzy search
   */
  async findFilteredPaginated(
    page: number,
    limit: number,
    filter: { column: string, value: string }
  ): Promise<Medication[]> {
    const allowedColumns = ['medicationId', 'name', 'category', 'brand_name', 'generic_name', 'strength', 'form'];
    if (!allowedColumns.includes(filter.column)) {
      throw new Error(`Unrecognized filter column: ${filter.column}`);
    }

    const meds = await this.prisma.$queryRawUnsafe<any[]>(`
      WITH q AS (
        SELECT unaccent(lower($1)) AS term
      )
      SELECT m.*,
            GREATEST(
              similarity(unaccent(lower(m.name)),         q.term),
              similarity(unaccent(lower(m.brand_name)),   q.term),
              similarity(unaccent(lower(m.category)),     q.term),
              similarity(unaccent(lower(m.generic_name)), q.term)
            ) AS best_score
      FROM medications m, q
      WHERE
        GREATEST(
          similarity(unaccent(lower(m.name)),         q.term),
          similarity(unaccent(lower(m.brand_name)),   q.term),
          similarity(unaccent(lower(m.category)),     q.term),
          similarity(unaccent(lower(m.generic_name)), q.term)
        ) > 0.30
      ORDER BY best_score DESC
      OFFSET $2
      LIMIT $3;
    `,
      filter.value,
      (page * limit),
      limit
    );

    return meds.map(m => this._toDomain(m));
  }

  /**
   * Get all medications with their batches
   */
  async findAllWithBatches(): Promise<Array<Medication & { batches: any[] }>> {
    const results = await this.prisma.medication.findMany({
      include: {
        batches: true
      }
    });
    return results.map(r => ({
      ...this._toDomain(r),
      batches: r.batches
    }));
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
      prisma.minimum_quantity ?? 0
    );
  }
}


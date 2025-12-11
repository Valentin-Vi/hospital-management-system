import { PrismaClient } from "@prisma/client";
import { Medication } from "@/models";

/**
 * Repository for Medication entity CRUD operations
 * Handles basic create, read, update, delete operations
 */
export class MedicationRepository {
  constructor(private readonly prisma: PrismaClient) {}

  /**
   * Create a new medication
   */
  async create(medication: Medication): Promise<Medication> {
    const prismaMedication = await this.prisma.medication.create({
      data: {
        name: medication.name,
        category: medication.category,
        brand_name: medication.brandName,
        generic_name: medication.genericName,
        strength: medication.strength,
        form: medication.form,
        minimum_quantity: medication.minimum_quantity,
      }
    });
    return this._toDomain(prismaMedication);
  }

  /**
   * Find medication by ID
   */
  async findById(id: number): Promise<Medication | null> {
    const result = await this.prisma.medication.findUnique({
      where: { medicationId: id }
    });
    return result ? this._toDomain(result) : null;
  }

  /**
   * Find all medications
   */
  async findAll(): Promise<Medication[]> {
    const results = await this.prisma.medication.findMany({
      orderBy: { medicationId: 'desc' }
    });
    return results.map(r => this._toDomain(r));
  }

  /**
   * Update medication
   */
  async update(id: number, data: Partial<Medication>): Promise<Medication> {
    const prismaMedication = await this.prisma.medication.update({
      where: { medicationId: id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.category && { category: data.category }),
        ...(data.brandName && { brand_name: data.brandName }),
        ...(data.genericName && { generic_name: data.genericName }),
        ...(data.strength && { strength: data.strength }),
        ...(data.form && { form: data.form }),
        ...(data.minimum_quantity !== undefined && { minimum_quantity: data.minimum_quantity }),
      }
    });
    return this._toDomain(prismaMedication);
  }

  /**
   * Delete medication by ID
   */
  async delete(id: number): Promise<void> {
    await this.prisma.medication.delete({
      where: { medicationId: id }
    });
  }

  /**
   * Delete multiple medications
   */
  async deleteMany(ids: number[]): Promise<void> {
    await this.prisma.medication.deleteMany({
      where: { medicationId: { in: ids } }
    });
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


import { PrismaClient } from "@prisma/client";
import { Medication } from "@/models/medication";

/**
 * Repository for Medication CRUD operations
 * Handles create, update, delete operations
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
    const medications = await this.prisma.medication.findMany();
    return medications.map(medication => this._toDomain(medication));
  }

  /**
   * Update medication
   */
  async update(id: number, data: Partial<Medication>): Promise<Medication> {
    const prismaMedication = await this.prisma.medication.update({
      where: { medicationId: id },
      data: {
        name: data.name,
        category: data.category,
        brand_name: data.brandName,
        generic_name: data.genericName,
        strength: data.strength,
        form: data.form,
        minimum_quantity: data.minimum_quantity,
      }
    });
    return this._toDomain(prismaMedication);
  }

  /**
   * Delete a medication by ID
   */
  async delete(id: number): Promise<void> {
    await this.prisma.medication.delete({
      where: { medicationId: id }
    });
  }

  /**
   * Delete multiple medications by IDs
   */
  async deleteMany(ids: number[]): Promise<void> {
    await this.prisma.medication.deleteMany({
      where: {
        medicationId: {
          in: ids
        }
      }
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
      prisma.minimum_quantity
    );
  }
}


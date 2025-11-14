import { Prisma, PrismaClient } from "@prisma/client";
import { Inventory, Medication } from "@models";
import { MedicationSchema } from "models/schemas/MedicationSchema";

class MedicationDal {

  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient()
    return this;
  };

  async insertMedication(medication: Medication): Promise<Medication> {
    const prismaMedication = await this.prisma.medication.create({
      data: {
        name: medication.name,
        category: medication.category,
        expiration_date: medication.expirationDate,
        brand_name: medication.brandName,
        generic_name: medication.genericName,
        strength: medication.strength,
        form: medication.form
      }
    })
    return this._buildOne(prismaMedication)
  }

  async getPaginatedMedications(page: number, limit: number): Promise<Medication[]> {
    const prismaMedications = await this.prisma.medication.findMany({ 
      skip: page * limit,
      take: limit,
      orderBy: { medicationId: 'desc' }
    })
    return this._buildMany(prismaMedications)
  }

  async getFilteredPaginatedMedications(page: number, limit: number, filter: { column: string, value: string }): Promise<Medication[]> {
    
    const allowedColumns = ['medicationId', 'name', 'category', 'expiration_date', 'brand_name', 'generic_name', 'strength', 'form']
    if(!allowedColumns.includes(filter.column)) {
      throw new Error(`Unrecognized filter column: ${filter.column}`)
    }

    const meds = await this.prisma.$queryRawUnsafe(`
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
    ) ?? [];

    return this._buildMany(meds as Medication[])
  }

  async deleteRow(rowId: number): Promise<boolean> {
    return (await this.prisma.$transaction([
      this.prisma.inventory.deleteMany({
        where: { productId: rowId }, // the FK to Medication
      }),
      this.prisma.medication.delete({
        where: { medicationId: rowId },
      }),
    ]) ? true : false);
  }

  async getEntireMedicationsInventory() {
    return this._buildMany(
      await this.prisma.medication.findMany({
        include: {
          inventory: true
        }
      })
    )
  }

  async deleteMany(rowIds: number[]): Promise<boolean> {
    return (await this.prisma.$transaction([
      this.prisma.inventory.deleteMany({
        where: {
          productId: {
            in: rowIds
          }
        },
      }),
      this.prisma.medication.deleteMany({
        where: {
          medicationId: { in: rowIds }
        },
      }),
    ]) ? true : false)
  }
  
  private _buildOne(prismaMedication: any): Medication {
    return new Medication(
      prismaMedication.medicationId,
      prismaMedication.name,
      prismaMedication.category,
      prismaMedication.expiration_date,
      prismaMedication.brand_name,
      prismaMedication.generic_name,
      prismaMedication.strength,
      prismaMedication.form
    )
  }

  private _buildMany(prismaMedications: any[]): Medication[] {
    let medInv = [];
    for (const entry of prismaMedications) {
      const med = this._buildOne(entry)
      if(entry.inventory) med.inventory = new Inventory(entry.inventory.inventoryId, entry.inventory.productId, entry.inventory.quantity ?? 0, entry.inventory.minimum_quantity);
      medInv.push(med)
    }
    return medInv
  }
}

export default MedicationDal;

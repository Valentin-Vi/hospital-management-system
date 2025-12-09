import { Medication } from "@models";
import { PrismaClient } from "@prisma/client";
import { TMedicationInventory } from "@models/schemas";

export default class InventoryDal {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient()
    return this;
  };

  async getPaginatedMedications(page: number, limit: number): Promise<TMedicationInventory[]> {
    return this._buildManyFully(
      await this.prisma.medication.findMany({
        skip: page * limit,
        take: limit,
        orderBy: { medicationId: 'desc' },
        include: {
          inventory: true
        }
      })
    )
  }

  private _buildManyFully(prismaMedications: any[]): TMedicationInventory[] {
    let medicationInventory: TMedicationInventory[] = []
    for (const entry of prismaMedications) {
      try {
        const med = new Medication(
          entry.medicationId,
          entry.name,
          entry.category,
          entry.brand_name,
          entry.generic_name,
          entry.strength,
          entry.form
        )
        const inventory = entry.inventory ? {
          itemId: entry.inventory.inventoryId,
          productId: entry.inventory.medicationId,
          quantity: entry.inventory.quantity,
          minimunQuantity: entry.inventory.minimum_quantity
        } : undefined;
        medicationInventory.push({
          ...med,
          inventory: inventory
        })
      } catch (err) {
        console.error(err)
      }
    }
    return medicationInventory
  }


  private _buildMeds(prismaMedications: any[]): Medication[] | [] {
    let medications: Medication[] = []
    for (const entry of prismaMedications) {
      try {
        medications.push(
          new Medication(
            entry.medicationId,
            entry.name,
            entry.category,
            entry.brand_name,
            entry.generic_name,
            entry.strength,
            entry.form
          )
        )
      } catch (err) {
        console.error(err)
      }
    }
    return medications
  }
}

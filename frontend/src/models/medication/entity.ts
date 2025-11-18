import type { InventoryShema } from '@/models/inventory/schema';
import type { TMedicationSchema, TMedicationWithInventorySchema } from './schema';

type MedicationInput = TMedicationSchema | TMedicationWithInventorySchema;

export class Medication {
  medicationId: number;
  name: string;
  category: string;
  expirationDate: string;
  brandName: string;
  genericName: string;
  strength: string;
  form: string;
  inventory?: InventoryShema;

  constructor(input: MedicationInput) {
    this.medicationId = input.medicationId;
    this.name = input.name;
    this.category = input.category;
    this.expirationDate = input.expirationDate;
    this.brandName = input.brandName;
    this.genericName = input.genericName;
    this.strength = input.strength;
    this.form = input.form;

    if ('inventory' in input) {
      this.inventory = input.inventory;
    }
  }
}

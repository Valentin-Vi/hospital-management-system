import { z } from 'zod';
import { type TMedicationInventoryItem } from '../inventory';

export const MedicationSchema = z.object({
  medicationId: z.number().int().nonnegative(),           // Prisma: Int @id @default(autoincrement())
  name: z.string().nonempty().max(200),
  category: z.string().nonempty().max(200),
  brandName: z.string().nonempty().max(200),
  genericName: z.string().nonempty().max(200),
  strength: z.string().nonempty().max(200),
  form: z.string().nonempty().max(200),
})
export type TMedicationSchema = z.infer<typeof MedicationSchema>

// Medication with optional inventory information
export type TMedicationInventory = TMedicationSchema & {
  inventory?: TMedicationInventoryItem;
}


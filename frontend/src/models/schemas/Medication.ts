import { z } from 'zod';
import { InventorySchema } from './Inventory';

export const MedicationSchema = z.object({
  medicationId: z.number().int(),           // Prisma: Int @id @default(autoincrement())
  name: z.string().nonempty().max(200),
  category: z.string().nonempty().max(200),
  expirationDate: z.string(),                               // Prisma: DateTime
  brandName: z.string().nonempty().max(200),
  genericName: z.string().nonempty().max(200),
  strength: z.string().nonempty().max(200),
  form: z.string().nonempty().max(200),
})
export type TMedicationSchema = z.infer<typeof MedicationSchema>

export const MedicationWithInventorySchema = MedicationSchema.extend({
  inventory: InventorySchema
})
export type TMedicationWithInventorySchema = z.infer<typeof MedicationWithInventorySchema>

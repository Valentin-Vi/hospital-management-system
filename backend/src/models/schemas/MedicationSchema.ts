import { z } from 'zod';
import { InventorySchema } from './InventorySchema';

export const MedicationSchema = z.object({
  medicationId: z.number().int().nonnegative(),           // Prisma: Int @id @default(autoincrement())
  name: z.string().nonempty().max(200),
  category: z.string().nonempty().max(200),
  expirationDate: z.coerce.date(),                               // Prisma: DateTime
  brandName: z.string().nonempty().max(200),
  genericName: z.string().nonempty().max(200),
  strength: z.string().nonempty().max(200),
  form: z.string().nonempty().max(200),
})
export type TMedicationSchema = z.infer<typeof MedicationSchema>

export const MedicationInventory = MedicationSchema.extend({
  inventory: InventorySchema
})
export type TMedicationInventory = z.infer<typeof MedicationInventory>


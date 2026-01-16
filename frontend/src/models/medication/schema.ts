import { z } from 'zod';
import { inventorySchema } from '@/models/inventory';

export const medicationSchema = z.object({
  medicationId: z.number().int(),           // Prisma: Int @id @default(autoincrement())
  name: z.string().nonempty().max(255),
  category: z.string().nonempty().max(255),
  brandName: z.string().nonempty().max(255),
  genericName: z.string().nonempty().max(255),
  strength: z.string().nonempty().max(255),
  form: z.string().nonempty().max(255),
  expirationDate: z.iso.datetime(),                               // Prisma: DateTime
}).strict()

export type TMedicationSchema = z.infer<typeof medicationSchema>

export const medicationWithInventorySchema = medicationSchema.extend({
  inventory: inventorySchema
}).strict()

export type TMedicationWithInventorySchema = z.infer<typeof medicationWithInventorySchema>

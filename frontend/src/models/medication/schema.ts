import { z } from 'zod';
import { BatchSchema } from '@/models/batch';

export const medicationSchema = z.object({
  medicationId: z.number().int(),           // Prisma: Int @id @default(autoincrement())
  name: z.string().nonempty().max(255),
  category: z.string().nonempty().max(255),
  brandName: z.string().nonempty().max(255),
  genericName: z.string().nonempty().max(255),
  strength: z.string().nonempty().max(255),
  form: z.string().nonempty().max(255),
  expirationDate: z.string(),                               // Prisma: DateTime
}).strict()

export type TMedicationSchema = z.infer<typeof medicationSchema>

export const medicationWithBatchSchema = medicationSchema.extend({
  batches: BatchSchema.array()
}).strict()

export type TMedicationWithBatchSchema = z.infer<typeof medicationWithBatchSchema>

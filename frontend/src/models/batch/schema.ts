import { z } from "zod";

export const BatchSchema = z.object({
  batchId: z.number().int().optional(), // autoincremented
  medicationId: z.number().int(),
  quantity: z.number().int().min(0),
  expiration_date: z.string(), 
});
export type TBatchSchema = z.infer<typeof BatchSchema>
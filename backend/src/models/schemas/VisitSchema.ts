import { z } from 'zod';

export const VisitSchema = z.object({
  visitId: z.number().int(),
  creationDate: z.date(),
  visitDate: z.date(),
  doctorId: z.number().int(),
  clientId: z.number().int()
})

export type TVisitSchema = z.infer<typeof VisitSchema>;

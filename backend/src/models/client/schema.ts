import { z } from 'zod';
import { VisitSchema } from '@/models/visit';
import { UserSchema } from '@/models/user'

export const ClientSchema = UserSchema.extend({
  clientId: z.number().int(),
  visits: z.array(VisitSchema).default([])
});

export type TClientSchema = z.infer<typeof ClientSchema>;

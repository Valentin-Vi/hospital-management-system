import { z } from 'zod';
import { VisitSchema } from './VisitSchema';
import { UserSchema } from './UserSchema'

export const ClientSchema = UserSchema.extend({
  clientId: z.number().int(),
  visits: z.array(VisitSchema).default([])
});

export type TClientSchema = z.infer<typeof ClientSchema>;

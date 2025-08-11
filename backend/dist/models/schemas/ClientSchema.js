import { z } from 'zod';
import { UserSchema, VisitSchema } from '@models/schemas';
export const ClientSchema = UserSchema.extend({
    clientId: z.number().int(),
    visits: z.array(VisitSchema).default([])
});

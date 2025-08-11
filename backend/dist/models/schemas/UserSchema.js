import { z } from 'zod';
import { UserTypeEnumSchema } from '@models/schemas';
export const UserSchema = z.object({
    userId: z.number().int(),
    email: z.string().email(),
    password: z.string().min(8).max(20),
    firstname: z.string().max(24),
    lastname: z.string().max(24),
    enabled: z.boolean(),
    type: UserTypeEnumSchema.default('VISITOR')
});

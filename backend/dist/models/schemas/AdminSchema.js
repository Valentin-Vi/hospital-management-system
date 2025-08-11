import { z } from 'zod';
import { UserSchema } from '@models/schemas';
export const AdminSchema = UserSchema.extend({
    admin_id: z.number().int()
});

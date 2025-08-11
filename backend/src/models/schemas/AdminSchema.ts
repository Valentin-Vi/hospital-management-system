import { z } from 'zod';
import { UserSchema } from './UserSchema';

export const AdminSchema = UserSchema.extend({
  admin_id: z.number().int()
})

export type TAdminSchema = z.infer<typeof AdminSchema>

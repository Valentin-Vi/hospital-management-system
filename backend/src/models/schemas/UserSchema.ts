import { z } from 'zod';
import { UserTypeEnumSchema } from './UserTypeEnumSchema';

export const UserSchema = z.object({
  userId: z.number().int(),
  email: z.string().email(),
  password: z.string().min(8).max(90),
  firstname: z.string().min(1).max(24),
  lastname: z.string().max(1).max(24),
  enabled: z.boolean(),
  type: UserTypeEnumSchema.default('VISITOR')
})

export type TUserSchema = z.infer<typeof UserSchema>

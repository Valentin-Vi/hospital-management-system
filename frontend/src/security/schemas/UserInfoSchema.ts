import { z } from 'zod';
import { UserSchema } from '@/models/schemas';

export const UserInfoSchema = UserSchema.omit({
  userId: true,
  enabled: true
})

export type TUserInfoSchema = z.infer<typeof UserInfoSchema>

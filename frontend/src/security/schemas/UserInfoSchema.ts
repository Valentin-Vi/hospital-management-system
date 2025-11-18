import { z } from 'zod';
import { userSchema } from '@/models/user';

export const userInfoSchema = userSchema.omit({
  userId: true,
  enabled: true,
  password: true
})

export type TUserInfoSchema = z.infer<typeof userInfoSchema>

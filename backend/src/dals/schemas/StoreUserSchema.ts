import { UserSchema } from '@models/schemas';
import { z } from 'zod';

export const StoreUserSchema = UserSchema.pick({
  email: true,
  password: true,
  firstname: true,
  lastname: true
})

export type TStoreUserSchema = z.infer<typeof StoreUserSchema>

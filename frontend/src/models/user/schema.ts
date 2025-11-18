import { z } from 'zod';

export const userRoleSchema = z.enum(['VISITOR', 'CLIENT', 'DOCTOR', 'DESK', 'ADMIN'] as const);

export const userSchema = z.object({
  userId: z.number().nonnegative(),
  email: z.email(),
  password: z.string().max(255),
  firstname: z.string().max(255),
  lastname: z.string().max(255),
  type: userRoleSchema,
  enabled: z.boolean()
})

export type TUserSchema = z.infer<typeof userSchema>

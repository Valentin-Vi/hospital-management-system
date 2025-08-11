import { z } from 'zod';

const userTypes = [
  'VISITOR',
  'CLIENT',
  'DOCTOR',
  'DESK',
  'ADMIN'
] as const

export const UserTypeEnumSchema = z.enum(userTypes)

export type TUserTypeEnumSchema = z.infer<typeof UserTypeEnumSchema>;


export const UserSchema = z.object({
  userId: z.number().nonnegative(),
  email: z.string().email(),
  firstname: z.string().max(24),
  lastname: z.string().max(24),
  type: UserTypeEnumSchema.default('VISITOR'),
  enabled: z.boolean()
})

export type TUserSchema = z.infer<typeof UserSchema>

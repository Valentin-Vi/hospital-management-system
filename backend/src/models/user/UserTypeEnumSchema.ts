import { z } from "zod";

export const UserTypeEnumSchema = z.enum([
  'VISITOR',
  'CLIENT',
  'DOCTOR',
  'DESK',
  'ADMIN'
])

export type TUserTypeEnumSchema = z.infer<typeof UserTypeEnumSchema>;

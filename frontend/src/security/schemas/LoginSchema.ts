import { UserSchema } from "@models/schemas";
import { SignupParamsSchema } from "@security/schemas";
import { z } from "zod";

const UserDataSchema = UserSchema.pick({
  email: true,
  firstname: true,
  lastname: true,
  type: true
})

export const LoginParamsSchema = SignupParamsSchema.omit({
  firstname: true,
  lastname: true
})

export type TLoginParams = z.infer<typeof LoginParamsSchema>

export const LoginResponseBodySchema = z.object({
  message: z.string(),
  data: UserDataSchema
})
export type TLoginResponseBody = z.infer<typeof LoginResponseBodySchema>
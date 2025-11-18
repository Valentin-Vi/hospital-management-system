import { userSchema } from "@/models/user";
import { SignupParamsSchema } from "@/security/schemas";
import { z } from "zod";

const userDataSchema = userSchema.pick({
  email: true,
  firstname: true,
  lastname: true,
  type: true
})

export const loginParamsSchema = SignupParamsSchema.omit({
  firstname: true,
  lastname: true
})
export type TLoginParams = z.infer<typeof loginParamsSchema>

export const loginResponseBodySchema = z.object({
  message: z.string(),
  data: userDataSchema
})
export type TLoginResponseBody = z.infer<typeof loginResponseBodySchema>
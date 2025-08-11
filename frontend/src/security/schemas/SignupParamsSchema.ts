import { z } from "zod"

export const SignupParamsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(90),
  firstname: z.string().min(2).max(24),
  lastname: z.string().min(1).max(24)
})

export type TSignupParams = z.infer<typeof SignupParamsSchema>

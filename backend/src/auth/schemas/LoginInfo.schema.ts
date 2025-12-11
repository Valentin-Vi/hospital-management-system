import { UserSchema } from "@/models/schemas";
import { z } from "zod";

export const LoginInfoSchema = UserSchema.pick({
  email: true,
  password: true
})

export type TLoginInfo = z.infer<typeof LoginInfoSchema>

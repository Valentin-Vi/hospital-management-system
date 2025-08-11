import z from "zod";
import { UserSchema } from "@models/schemas";

export const SignupInfoSchema = UserSchema.omit({
  userId: true,
  type: true,
  enabled: true,
});

export type TSignupInfo = z.infer<typeof SignupInfoSchema>

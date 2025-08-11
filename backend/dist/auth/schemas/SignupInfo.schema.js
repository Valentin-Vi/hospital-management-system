import { UserSchema } from "@models/schemas";
export const SignupInfoSchema = UserSchema.omit({
    userId: true,
    type: true,
    enabled: true,
});

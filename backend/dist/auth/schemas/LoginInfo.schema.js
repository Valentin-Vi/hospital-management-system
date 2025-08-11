import { UserSchema } from "@models/schemas";
export const LoginInfoSchema = UserSchema.pick({
    email: true,
    password: true
});

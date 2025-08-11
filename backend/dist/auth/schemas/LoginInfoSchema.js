import { UserSchema } from "../../model/schemas";
export const LoginInfoSchema = UserSchema.pick({
    email: true,
    password: true
});

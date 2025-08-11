import { UserSchema } from "../../authentication_project/src/model/schemas/UserSchema";
export const SignupUserInfoSchema = UserSchema.omit({
    user_id: true,
    type: true,
    enabled: true,
});

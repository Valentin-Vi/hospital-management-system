import { UserSchema } from 'model/schemas';
export const StoreUserSchema = UserSchema.pick({
    email: true,
    password: true,
    firstname: true,
    lastname: true
});

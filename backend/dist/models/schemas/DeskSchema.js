import { z } from 'zod';
import { UserSchema } from '@models/schemas';
export const DeskSchema = UserSchema.extend({
    deskId: z.number().int()
});

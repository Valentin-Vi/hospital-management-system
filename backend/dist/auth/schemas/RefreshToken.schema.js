import { z } from 'zod';
export const RefreshTokenSchema = z.object({
    userId: z.number().int(),
    email: z.string().email(),
    password: z.string()
});

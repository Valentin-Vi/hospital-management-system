import { z } from 'zod';
import { UserSchema } from '@/models/user';

export const DeskSchema = UserSchema.extend({
  deskId: z.number().int()
});

export type TDeskSchema = z.infer<typeof DeskSchema>;

import { z } from 'zod';
import { UserSchema } from './UserSchema';

export const DeskSchema = UserSchema.extend({
  deskId: z.number().int()
});

export type TDeskSchema = z.infer<typeof DeskSchema>;

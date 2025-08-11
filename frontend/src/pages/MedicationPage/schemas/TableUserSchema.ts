import { UserSchema } from '@models/schemas';
import { z } from 'zod/v4';

const TableUserSchema = UserSchema.extend({
  userId: z.number().nonnegative(),
  enabled: z.boolean()
})

export default TableUserSchema

export type TTableUserSchema = z.infer<typeof TableUserSchema>

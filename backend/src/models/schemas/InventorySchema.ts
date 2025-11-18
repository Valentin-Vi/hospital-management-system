import { z } from 'zod';

export const InventorySchema = z.object({
  itemId: z.number().int().nonnegative(),
  productId: z.number().int().nonnegative(),
  quantity: z.number().int().nonnegative().default(0),
  minimunQuantity: z.number().int().nonnegative().default(0),
})

export type TInventorySchema = z.infer<typeof InventorySchema>

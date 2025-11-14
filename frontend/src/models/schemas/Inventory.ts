import { z } from 'zod';

export const InventorySchema = z.object({
  inventoryId: z.number().int(),
  productId: z.number().int(),
  quantity: z.number().int(),
  minimumQuantity: z.number().int()
})
export type TInventoryShema = z.infer<typeof InventorySchema>